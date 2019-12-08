import React, { Component } from 'react';
import {
  Draggable
} from 'react-beautiful-dnd';
import classnames from 'classnames';
import moment from 'moment';

import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';

import BoardDueAt from './BoardDueAt';
import AvatarGroup from '../Avatars/AvatarGroup';
import { TASK_STATUS } from '../../configs/enums';

class BoardItem extends Component {
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

  render() {
    const {
      data, index, onClick
    } = this.props;

    const { attachments } = this;

    let renderTasks = null;
    if (data.tasks && data.tasks.length > 0) {
      let completedTask = 0;
      for (let i = 0; i < data.tasks.length; i++) {
        const task = data.tasks[i];
        if (task.status === TASK_STATUS.VERIFIED) {
          completedTask++;
        }
      }
      renderTasks = (
        <div className="meta-item">
          {
            completedTask === data.tasks.length ? (
              <Icon source={Svgs.iconCheckCircle} color="success" size="msm" />
            ) : (
              <Icon source={Svgs.iconMinusCircle} color="warning" size="msm" />
            )
          }
          <span>{` ${completedTask} / ${data.tasks.length}`}</span>
        </div>
      );
    }
    let isToday = false;
    if (data.due_at) {
      const diffInDays = moment(moment(data.due_at).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(
        moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD')
      );
      isToday = !diffInDays;
    }

    return (
      <Draggable draggableId={data.id} index={index}>
        {(provided, snapshot) => (
          <div
            onClick={(e) => { onClick(e, data); }}
            role="presentation"
            className={classnames({
              'board-item': true,
              'bg-ivory': isToday,
              active: snapshot.isDragging
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={
              { ...provided.draggableProps.style }
            }
          >
            <div className="users">
              <div className="order">
                {data.number}
              </div>
              <div className="assignees">
                <AvatarGroup users={data.assignees} verifiers={data.verifiers} />
              </div>
            </div>
            <div className="title">
              {data.title}
            </div>
            <div className="meta">
              <div className="meta-left">
                {
                  data.flags > 0 && (
                    <div className="meta-item">
                      <span>{ data.flags }</span>
                      <Icon source={Svgs.iconFlag} color="gray" />
                    </div>
                  )
                }
                {
                  attachments && attachments.length > 0 && (
                    <div className="meta-item">
                      <span>{ attachments && attachments.length > 0 ? attachments.length : 0 }</span>
                      <Icon source={Svgs.iconAttachment} color="gray" />
                    </div>
                  )
                }
                {renderTasks}
              </div>
              <div className="meta-right">
                <BoardDueAt date={data.due_at} />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

BoardItem.defaultProps = {
  data: {},
  index: 0,
  onClick: () => {}
};

export default BoardItem;
