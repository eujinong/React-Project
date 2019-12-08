import React from 'react';
import classnames from 'classnames';
import { TASK_STATUS } from '../../configs/enums'

const OrderBoardTasksProgress = (props) => {
  const {
    tasks
  } = props;

  return (tasks && tasks.length > 0) && (
    <div className="tasks-progress">
      {
        tasks.map((task, index) => {
          const taskClassNameMap = {
            'progress-item': true
          };
          if (task.status === TASK_STATUS.VERIFIED) {
            taskClassNameMap['bg-success'] = true;
          } else {
            taskClassNameMap['bg-secondary'] = true;
          }
          return (
            <div className={classnames(taskClassNameMap)} key={`${index}`} />
          );
        })
      }
    </div>
  );
};

OrderBoardTasksProgress.defaultProps = {
  tasks: []
};

export default OrderBoardTasksProgress;
