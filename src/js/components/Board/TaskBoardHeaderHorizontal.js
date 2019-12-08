import React, { Component } from 'react';
import classnames from 'classnames';

import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';

class TaskBoardHeaderHorizontal extends Component {
  render() {
    const {
      isOpen, data, onToggle
    } = this.props;

    return (
      <div
        className="board-header cursor-pointer"
        onClick={onToggle}
        role="presentation"
      >
        <div
          className={classnames({
            caption: true,
            'bg-danger': data.value === 'overdue'
          })}
        >
          {`${data.label} (${data.tasks.length})`}
        </div>
        <div>
          <div
            className={classnames({
              opened: isOpen,
              action: true
            })}
          >
            <Icon color="gray" source={Svgs.iconChevronDown} />
          </div>
        </div>
      </div>
    );
  }
}

TaskBoardHeaderHorizontal.defaultProps = {
  date: {},
  isOpen: false,
  onToggle: () => {}
};

export default TaskBoardHeaderHorizontal;
