import React, { Component } from 'react';
import moment from 'moment';

class OrderBoardHeader extends Component {
  render() {
    const {
      data
    } = this.props;

    let totalCount = 0;
    let todayCount = 0;
    if (data.orders && data.orders.length > 0) {
      totalCount = data.orders.length;
      for (let i = 0; i < totalCount; i++) {
        const phase = data.orders[i];
        if (phase.due_at) {
          const diffInDays = moment(moment(phase.due_at).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(
            moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD')
          );
          if (diffInDays === 0) {
            todayCount++;
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
            {totalCount}
            {' '}
            total
            )
          </b>
        </div>
      </div>
    );
  }
}

OrderBoardHeader.defaultProps = {
  date: {}
};

export default OrderBoardHeader;
