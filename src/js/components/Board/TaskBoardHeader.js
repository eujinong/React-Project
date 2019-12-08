import React, { Component } from 'react';
import moment from 'moment';

class TaskBoardHeader extends Component {
  render() {
    const {
      data, byUserTask
    } = this.props;

    let totalCount = 0;
    let todayCount = 0;
    let byUserCount = 0;
    if (data.tasks && data.tasks.length > 0) {
      totalCount = data.tasks.length;
      for (let i = 0; i < totalCount; i++) {
        const task = data.tasks[i];
        if (task.due_at) {
          const diffInDays = moment(moment(task.due_at).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(
            moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD')
          );
          if (diffInDays === 0) {
            todayCount++;
          }
        }
      }
    }
    if (byUserTask) {
      if (data.tasks && data.tasks.length > 0) {
        totalCount = data.tasks.length;
        for (let i = 0; i < totalCount; i++) {
          const task = data.tasks[i];
          if (task.assigned_to_me) {
            byUserCount++;
          }
        }
      }
    }

    return (
      <div className="board-header">
        <div className="caption">{data.label}</div>
        <div>
          {todayCount}
          {' '}
          today
          {' '}
          <b>
            (
            {byUserTask ? byUserCount : totalCount}
            {' '}
            total
            )
          </b>
        </div>
      </div>
    );
  }
}

TaskBoardHeader.defaultProps = {
  date: {},
  byUserTask: false
};

export default TaskBoardHeader;
