import React, { Component } from 'react';
import classnames from 'classnames';

import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';

class OrderBoardHeaderHorizontal extends Component {
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
          {`${data.label} (${data.orders.length})`}
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

OrderBoardHeaderHorizontal.defaultProps = {
  date: {},
  isOpen: false,
  onToggle: () => {}
};

export default OrderBoardHeaderHorizontal;
