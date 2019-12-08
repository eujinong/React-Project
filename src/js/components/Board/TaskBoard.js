import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  Row, Col
} from 'reactstrap';
import classnames from 'classnames';

import TaskBoardItem from './TaskBoardItem';
import TaskBoardHeader from './TaskBoardHeader';
import { Images } from '../../theme';

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      taskList: true
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    });
    const { data } = props;
    if (!data[0].tasks.length && !data[1].tasks.length && !data[2].tasks.length && !data[3].tasks.length) {
      this.setState({
        taskList: false
      });
    } else {
      this.setState({
        taskList: true
      });
    }
  }

  handleDragEnd(result) {
    this.props.onDragEnd(result);
  }

  render() {
    const {
      data, taskList
    } = this.state;

    const {
      onItemClick, byUserTask, isSearch, tasks
    } = this.props;

    return (
      <Row className="row-small-margin">
        <DragDropContext onDragEnd={this.handleDragEnd.bind(this)}>
          {
            data.map((boardData, boardIndex) => (
              <Col className="col-xx-3 col-xl-6 col-lg-6 col-12 mb-4" key={`${boardIndex}`}>
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
                    >
                      <TaskBoardHeader data={boardData} byUserTask={byUserTask} />
                      {boardData.tasks.map((boardItemData, boardItemIndex) => (
                        byUserTask ? (
                          (boardItemData.assigned_to_me || boardItemData.verified_by_me) && (
                            <TaskBoardItem data={boardItemData} key={`${boardItemIndex}`} index={boardItemIndex} onClick={() => { onItemClick(boardItemData); }} />
                          )
                        ) : (
                          <TaskBoardItem data={boardItemData} key={`${boardItemIndex}`} index={boardItemIndex} onClick={() => { onItemClick(boardItemData); }} />
                        )
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            ))
          }
        </DragDropContext>
        {
          !isSearch && !taskList && tasks.length > 1 && (
            <div className="empty-data">
              <div className="content text-center">
                <img src={Images.empty_icon} alt="Empty Icon" />
                <div className="font-weight-bold">
                  All done. The future is yours!
                </div>
                <div className="text-secondary">
                  You`ve completed all of your orders. More orders will appear here as they are assigned, so check back soon.
                </div>
              </div>
            </div>
          )
        }
        {
          isSearch && !taskList && (
            <div className="empty-data">
              <div className="content text-center">
                <img src={Images.empty_icon} alt="Empty Icon" />
                <div className="font-weight-bold">
                  Nothing to see here.
                </div>
                <div className="text-secondary">
                  No results found! Please try adjusting your search or filter to find what you`re looking for.
                </div>
              </div>
            </div>
          )
        }
      </Row>
    );
  }
}

TaskBoard.props = {
  data: [],
  tasks: [],
  byUserTask: false,
  isSearch: false,
  onDragEnd: () => {},
  onItemClick: () => {}
};

export default TaskBoard;
