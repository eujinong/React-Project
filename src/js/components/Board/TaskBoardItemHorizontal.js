import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';

import BoardDueAt from './BoardDueAt';
import AvatarGroup from '../Avatars/AvatarGroup';
import OptionsHelper, { TaskPhaseOptions, TaskStatusSecondaryOptions } from '../../helpers/OptionsHelper';

class TaskBoardItemHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      data, onClick
    } = this.props;

    let isUrgent = false;
    if (data.due_at) {
      const diffInDays = moment(moment(data.due_at).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(
        moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD')
      );
      isUrgent = diffInDays <= 0;
    }

    const phaseOption = OptionsHelper.getOption(data.phase, TaskPhaseOptions);
    const statusOption = OptionsHelper.getOption(data.status, TaskStatusSecondaryOptions);

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
              {phaseOption && ` - ${phaseOption.label}`}
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
              data.notes && data.notes.length > 0 && (
                <div className="meta-item">
                  <span>{ data.notes && data.notes.length > 0 ? data.notes.length : 0 }</span>
                  <Icon source={Svgs.iconNotification} color="gray" />
                </div>
              )
            }
            <div className="meta-item mx-2">
              <AvatarGroup users={data.assignees} verifiers={data.verifiers} />
            </div>
          </div>
          <div className="meta-right">
            <BoardDueAt date={data.due_at} escalated={data.order && data.order.escalated} />
          </div>
        </div>
      </div>
    );
  }
}

TaskBoardItemHorizontal.defaultProps = {
  data: {},
  index: 0,
  onClick: () => {}
};

export default TaskBoardItemHorizontal;
