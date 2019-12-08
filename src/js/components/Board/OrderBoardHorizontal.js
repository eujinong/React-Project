import React, { Component } from 'react';
import classnames from 'classnames';
import {
  Collapse
} from 'reactstrap';

import OrderBoardHeaderHorizontal from './OrderBoardHeaderHorizontal';
import OrderBoardItemHorizontal from './OrderBoardItemHorizontal';

class OrderBoardHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      isOpen: true
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    });
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {
      data, isOpen
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
        <OrderBoardHeaderHorizontal
          data={data}
          onToggle={this.handleToggle}
          isOpen={isOpen}
        />
        <Collapse isOpen={isOpen}>
          {data.orders.map((boardItemData, boardItemIndex) => (
            <OrderBoardItemHorizontal data={boardItemData} key={`${boardItemIndex}`} index={boardItemIndex} onClick={onItemClick} />
          ))}
        </Collapse>
      </div>
    );
  }
}

OrderBoardHorizontal.props = {
  data: [],
  onItemClick: () => {}
};

export default OrderBoardHorizontal;
