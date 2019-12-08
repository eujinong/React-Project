/* eslint-disable no-param-reassign */
import {
  TASK_STATUS, ORDER_STATUS, ATTACHMENT_TYPE,
  NOTIFICATION_TYPE
} from '../configs/enums';
import { TaskPhaseOptions } from './OptionsHelper';

const DataHelper = {
  getOrderItemAttachments: (orderItem) => {
    const ret = [];
    const {
      tasks
    } = orderItem;
    if (tasks) {
      for (let i = 0, ni = tasks.length; i < ni; i++) {
        const task = tasks[i];
        if (task.attachments && task.attachments.length > 0) {
          ret.push(...task.attachments);
        }
      }
    }
    return orderItem;
  },
  getOrderItemStatus: (orderItem) => {
    const {
      tasks
    } = orderItem;

    if (tasks) {
      let todo = 0;
      let inProgress = 0;
      let awaiting = 0;
      let approved = 0;
      let completed = 0;

      const tasksLength = tasks.length;
      for (let i = 0; i < tasksLength; i++) {
        const task = tasks[i];
        switch (task.status) {
          case TASK_STATUS.TODO:
            todo++;
            break;
          case TASK_STATUS.IN_PROGRESS:
            inProgress++;
            break;
          case TASK_STATUS.PENDING_VERIFICATION:
            awaiting++;
            break;
          case TASK_STATUS.VERIFIED:
            approved++;
            break;
          case TASK_STATUS.COMPLETED:
          default:
            completed++;
            break;
        }
      }

      if (inProgress > 0) {
        return ORDER_STATUS.IN_PROGRESS;
      }
      if (todo === tasksLength) {
        return ORDER_STATUS.TODO;
      }
      if (awaiting === tasksLength) {
        return ORDER_STATUS.PENDING_VERIFICATION;
      }
      if (approved === tasksLength) {
        return ORDER_STATUS.VERIFIED;
      }
      if (approved + completed === tasksLength) {
        return ORDER_STATUS.CLOSED;
      }
      return ORDER_STATUS.IN_PROGRESS;
    }
    return ORDER_STATUS.TODO;
  },
  getFulfillOrder: (order) => {
    if (order.tasks) {
      for (let i = 0, ni = order.tasks.length; i < ni; i++) {
        const task = order.tasks[i];
        task.order = order;
      }
    }

    order.phases = [];
    for (let k = 0, nk = TaskPhaseOptions.length; k < nk; k++) {
      const phaseOption = TaskPhaseOptions[k];
      let phaseGroup = null;
      for (let j = 0; j < order.groups.length; j++) {
        let group = order.groups[j];
        if (group.value == phaseOption.value) {
          phaseGroup = group;
          break;
        }
      }
      const phase = {
        ...(phaseGroup || {}),
        ...phaseOption,
        order,
        tasks: []
      };
      for (let j = 0, nj = order.tasks.length; j < nj; j++) {
        const task = order.tasks[j];
        if (task.group === phaseOption.value) {
          task.order_phase = phase;
          phase.tasks.push(task);
        }
      }
      if (phase.tasks.length > 0) {
        order.phases.push(phase);
      }
    }
    return order;
  },
  getFullFillTasks: (order) => {
    const fullFillOrder = DataHelper.getFulfillOrder(order);
    return fullFillOrder.tasks;
  },
  combineFilesAndLinks: (files, links) => {
    const attachmentsForFiles = files ? files.map(file => ({
      ...file,
      attachment_type: ATTACHMENT_TYPE.FILE
    })) : [];

    const attachmentsForLinks = links ? links.map(link => ({
      ...link,
      attachment_type: ATTACHMENT_TYPE.URL
    })) : [];

    const attachments = [...attachmentsForFiles, ...attachmentsForLinks].sort((a, b) => (a.due_at < b.due_at));
    return attachments;
  },
  getNotificationsCount: (notifications) => {
    const data = {
      [NOTIFICATION_TYPE.ACTIONABLE]: 0,
      [NOTIFICATION_TYPE.READONLY]: 0
    };
    notifications.forEach((item) => {
      data[item.notification_type] += (item.data.count && 1);
    });
    return data;
  }
};

export default DataHelper;
