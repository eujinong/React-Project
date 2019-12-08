import React, { Component } from 'react';
import moment from 'moment';

class BoardHeader extends Component {
  render() {
    const {
      data
    } = this.props;

    let totalCount = 0;
    let todayCount = 0;
    if (data.items && data.items.length > 0) {
      totalCount = data.items.length;
      for (let i = 0; i < totalCount; i++) {
        const item = data.items[i];
        if (item.due_at) {
          const diffInDays = moment(moment(item.due_at).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(
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

BoardHeader.defaultProps = {
  date: {}
};

export default BoardHeader;
