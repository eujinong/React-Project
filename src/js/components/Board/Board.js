import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  Row, Col
} from 'reactstrap';
import classnames from 'classnames';

import BoardItem from './BoardItem';
import BoardHeader from './BoardHeader';

class Board extends Component {
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
      <Row>
        <DragDropContext onDragEnd={this.handleDragEnd.bind(this)}>
          {
            data.map((boardData, boardIndex) => (
              <Col lg={4} key={`${boardIndex}`}>
                <Droppable droppableId={`${boardIndex}`} key={`${boardIndex}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className={
                        classnames({
                          board: true,
                          active: snapshot.isDraggingOver
                        })
                      }
                      style={{
                      }}
                    >
                      <BoardHeader data={boardData} />
                      {boardData.tasks.map((boardItemData, boardItemIndex) => (
                        <BoardItem data={boardItemData} key={`${boardItemIndex}`} index={boardItemIndex} onClick={onItemClick} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            ))
          }
        </DragDropContext>
      </Row>
    );
  }
}

Board.props = {
  data: [],
  onDragEnd: () => {},
  onItemClick: () => {}
};

export default Board;
