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
import OptionsHelper, { TaskPhaseOptions } from '../../helpers/OptionsHelper';

class TaskBoardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      data, index, onClick
    } = this.props;
    let isToday = false;
    if (data.due_at) {
      const diffInDays = moment(moment(data.due_at).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(
        moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD')
      );
      isToday = !diffInDays;
    }
    const phaseOption = OptionsHelper.getOption(data.phase, TaskPhaseOptions);

    return (
      <Draggable draggableId={data.id} index={index}>
        {(provided, snapshot) => (
          <div
            onClick={onClick}
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
            <div className="top">
              <div>
                <div className="subtitle">
                  <span className="order-number">
                    {data.order.number ? data.order.number : data.order.id}
                  </span>
                  {phaseOption && ` - ${phaseOption.label}`}
                </div>
                <div className="title">
                  {data.title}
                </div>
              </div>
              <div>
                <AvatarGroup users={data.users} userCount={data.user_count} />
              </div>
            </div>
            <div className="bottom">
              <div className="meta-left">
                {
                  (data.note_count > 0) && (
                    <div className="meta-item">
                      <span>{ data.note_count }</span>
                      <Icon source={Svgs.iconComment} color="gray" />
                    </div>
                  )
                }
                {
                  data.attachments && data.attachments.length > 0 && (
                    <div className="meta-item">
                      <span>{ data.attachments && data.attachments.length > 0 ? data.attachments.length : 0 }</span>
                      <Icon source={Svgs.iconAttachment} color="gray" />
                    </div>
                  )
                }
                {
                  data.activities && data.activities.length > 0 && (
                    <div className="meta-item">
                      <span>{ data.activities && data.activities.length > 0 ? data.activities.length : 0 }</span>
                      <Icon source={Svgs.iconNotification} color="gray" />
                    </div>
                  )
                }
              </div>
              <div className="meta-right">
                <BoardDueAt date={data.due_at} escalated={data.order && data.order.escalated} onhold={data.onhold} />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

TaskBoardItem.defaultProps = {
  data: {},
  index: 0,
  onClick: () => {}
};

export default TaskBoardItem;
