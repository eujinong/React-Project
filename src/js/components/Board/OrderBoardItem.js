import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';

import BoardDueAt from './BoardDueAt';
import AvatarGroup from '../Avatars/AvatarGroup';
// import { TASK_STATUS } from '../../configs/enums';

class OrderBoardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      data, onClick
    } = this.props;

    const { note_count, attachment_count } = data;

    let renderTasks = null;
    if (data.task_count > 0) {
      // const totalTasks = data.task_count;
      // const totalPendingTasks = data.task_pending_count;
      // const totalCompletedTasks = totalTasks - totalPendingTasks;

      renderTasks = (
        <div className="meta-item">
          {
            // totalCompletedTasks === totalTasks ? (
            //   <Icon source={Svgs.iconCheckCircle} color="success" size="msm" />
            // ) : (
            //   <Icon source={Svgs.iconMinusCircle} color="warning" size="msm" />
            // )
          }
          &nbsp;&nbsp;
          {/* <span>{`${totalCompletedTasks} / ${totalTasks}`}</span>
          {data.task_count > 0 && (
            <span>&nbsp;tasks</span>
          )} */}
          <div className="task-progress">
            {
              data.task_progress && (
                data.task_progress.map((item, index) => (
                  <div
                    key={index}
                    className={item}
                  />
                ))
              )
            }
          </div>
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
          'board-item': true,
          'bg-ivory': isUrgent,
          'cursor-pointer': true
        })}
      >
        <div className="top">
          <div>
            <div className="topic">
              <span className="order-number">
                {data.number}
              </span>
            </div>
            <div className="font-size-sm">
              {`${data.fnn} - ${data.service_type} - ${data.service_of_type}`}
            </div>
          </div>
          <div>
            <AvatarGroup users={data.users} userCount={data.user_count} />
          </div>
        </div>
        <div className="bottom">
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
              attachment_count > 0 && (
                <div className="meta-item">
                  <span>{attachment_count > 0 ? attachment_count : 0}</span>
                  <Icon source={Svgs.iconAttachment} color="gray" />
                </div>
              )
            }
            {renderTasks}
          </div>
          <div className="meta-right">
            <BoardDueAt date={data.due_at} escalated={data.escalated} onhold={data.onhold} />
          </div>
        </div>
      </div>
    );
  }
}

OrderBoardItem.defaultProps = {
  data: {},
  index: 0,
  onClick: () => { }
};

export default OrderBoardItem;
