import React, { Component } from 'react';
import classnames from 'classnames';

import OrderBoardItem from './OrderBoardItem';
import OrderBoardHeader from './OrderBoardHeader';

class OrderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    });
  }

  handleDragEnd(result) {
    this.props.onDragEnd(result);
  }

  render() {
    const {
      data
    } = this.state;
    const {
      onItemClick
    } = this.props;

    return (
      <div
        className={
          classnames({
            board: true
          })
        }
      >
        <OrderBoardHeader data={data} />
        {data.orders.map((boardItemData, boardItemIndex) => (
          <OrderBoardItem
            data={boardItemData}
            key={`${boardItemIndex}`}
            index={boardItemIndex}
            onClick={onItemClick}
          />
        ))}
      </div>
    );
  }
}

OrderBoard.props = {
  data: [],
  onItemClick: () => {}
};

export default OrderBoard;
