import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';

import BoardDueAt from './BoardDueAt';
import AvatarGroup from '../Avatars/AvatarGroup';
import OptionsHelper, { TaskStatusSecondaryOptions, TaskPhaseOptions } from '../../helpers/OptionsHelper';
import DataHelper from '../../helpers/DataHelper';
import { TASK_STATUS } from '../../configs/enums';

class OrderBoardItemHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  get attachments() {
    const ret = [];
    const {
      tasks
    } = this.props.data;
    if (tasks) {
      for (let i = 0, ni = tasks.length; i < ni; i++) {
        const task = tasks[i];
        if (task.attachments && task.attachments.length > 0) {
          ret.push(...task.attachments);
        }
      }
    }
    return ret;
  }

  get assignees() {
    const ret = [];
    const {
      tasks
    } = this.props.data;
    if (tasks) {
      for (let i = 0, ni = tasks.length; i < ni; i++) {
        const task = tasks[i];
        if (task.assignees && task.assignees.length > 0) {
          ret.push(...task.assignees);
        }
      }
    }
    return ret;
  }

  get verifiers() {
    const ret = [];
    const {
      tasks
    } = this.props.data;
    if (tasks) {
      for (let i = 0, ni = tasks.length; i < ni; i++) {
        const task = tasks[i];
        if (task.verifiers && task.verifiers.length > 0) {
          ret.push(...task.verifiers);
        }
      }
    }
    return ret;
  }

  get group() {
    const {
      groups
    } = this.props.data;
    let group = null;
    if (groups && groups.length > 0) {
      for (let i = 0, ni = groups.length; i < ni; i++) {
        group = groups[i];
        if (group.status !== TASK_STATUS.COMPLETED) {
          break;
        }
      }
    }
    return group;
  }

  get note_count() {
    let note_count = 0;
    const {
      tasks
    } = this.props.data;
    if (tasks) {
      for (let i = 0, ni = tasks.length; i < ni; i++) {
        const task = tasks[i];
        note_count += task.note_count;
      }
    }
    return note_count;
  }

  render() {
    const {
      data, onClick
    } = this.props;

    const {
      attachments,
      note_count,
      group
    } = this;

    let statusOption;
    let phaseOption;

    if (group) {
      statusOption = OptionsHelper.getOption(group.status, TaskStatusSecondaryOptions, TaskStatusSecondaryOptions[0]);
      phaseOption = OptionsHelper.getOption(group.value, TaskPhaseOptions, TaskPhaseOptions[0]);
    } else {
      const status = DataHelper.getOrderItemStatus(data);
      statusOption = OptionsHelper.getOption(status, TaskStatusSecondaryOptions, TaskStatusSecondaryOptions[0]);
      phaseOption = OptionsHelper.getFieldOption('phase', data, TaskPhaseOptions, TaskPhaseOptions[0]);
    }

    let renderTasks = null;
    if (data.task_count > 0) {
      const totalTasks = data.task_count;
      const totalPendingTasks = data.task_pending_count;
      const totalCompletedTasks = totalTasks - totalPendingTasks;
      renderTasks = (
        <div className="meta-item">
          {
            totalCompletedTasks === totalTasks ? (
              <Icon source={Svgs.iconCheckCircle} color="success" size="msm" />
            ) : (
              <Icon source={Svgs.iconMinusCircle} color="warning" size="msm" />
            )
          }
          &nbsp;&nbsp;
          <span>{`${totalCompletedTasks} / ${totalTasks}`}</span>
        </div>
      );
    }
    let isUrgent = false;
    if (data.due_at) {
      const diffInDays = moment(moment(data.due_at).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(
        moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD')
      );
      isUrgent = diffInDays <= 0;
    }

    return (
      <div
        onClick={() => { onClick(data); }}
        role="presentation"
        className={classnames({
          'board-item-horizontal': true,
          'bg-ivory': isUrgent,
          'cursor-pointer': true
        })}
      >
        <div className="left">
          <div>
            <div className="subtitle">
              <span className="order-number">
                {data.number}
              </span>
              {` - ${phaseOption.label}`}
              <span className="text-warning">{statusOption && ` - ${statusOption.label}`}</span>
            </div>
            <div className="title">
              {data.title}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="meta-left">
            {
              note_count > 0 && (
                <div className="meta-item">
                  <span>{note_count}</span>
                  <Icon source={Svgs.iconComment} color="gray" />
                </div>
              )
            }
            {
              attachments && attachments.length > 0 && (
                <div className="meta-item">
                  <span>{attachments && attachments.length > 0 ? attachments.length : 0}</span>
                  <Icon source={Svgs.iconAttachment} color="gray" />
                </div>
              )
            }
            {renderTasks}
            <div className="meta-item mx-2">
              <AvatarGroup users={data.assignees} verifiers={data.verifiers} />
            </div>
          </div>
          <div className="meta-right">
            <BoardDueAt date={data.due_at} escalated={data.escalated} />
          </div>
        </div>
      </div>
    );
  }
}

OrderBoardItemHorizontal.defaultProps = {
  data: {},
  index: 0,
  onClick: () => { }
};

export default OrderBoardItemHorizontal;
