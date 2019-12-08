/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card, CardBody, CardHeader,
  Collapse
} from 'reactstrap';
import classnames from 'classnames';

import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';
import TaskPanelProgress from './TaskDetailPanelProgress';
import TaskPanelItem from './TaskDetailPanelItem';

class TaskPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen
    };
  }

  get note_count() {
    const {
      tasks
    } = this.props.data;
    let note_count = 0;
    if (tasks) {
      tasks.forEach((task) => { note_count += task.note_count; });
    }
    return note_count;
  }

  get status() {
    const {
      data
    } = this.props;
    let status = '';

    if (data.order.groups && data.order.groups.length > 0) {
      for (let i = 0, ni = data.order.groups.length; i < ni; i++) {
        const item = data.order.groups[i];
        if (item.value === data.value) {
          if (item.status === 'in-progress') {
            status = 'in_progress';
          } else if (item.status === 'to-do') {
            status = 'to_do';
          } else {
            status = 'completed';
          }
        }
      }
    }
    return status;
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderRedesign() {
    const {
      data
    } = this.props;

    const {
      redesign
    } = data;

    const redesignStatusProps = {
      children: 'REDESIGN',
      color: 'secondary'
    };

    if (redesign) {
      return <Badge {...redesignStatusProps} />;
    }

    return null;
  }

  render() {
    const {
      isOpen
    } = this.state;
    const {
      data, className, editable, users, user,
      onAdd, onItemClick, onItemCompleteChange,
      onItemAssigneeChange, onItemVerifierChange
    } = this.props;

    const {
      status, note_count
    } = this;

    const statusPropsList = {
      to_do: {
        children: 'To do',
        color: 'secondary'
      },
      in_progress: {
        children: 'In progress',
        color: 'warning'
      },
      completed: {
        children: 'Completed',
        color: 'primary'
      }
    };

    const classNameMap = {
      'board-panel': true
    };

    if (className) {
      classNameMap[className] = true;
    }

    return (
      <Card className={classnames(classNameMap)}>
        <CardHeader>
          <div
            className="panel-top cursor-pointer"
            onClick={this.handleToggle.bind(this)}
            role="presentation"
          >
            <div className="panel-title">
              {data.label}
            </div>
            <div className="panel-action">
              {
                note_count > 0 && (
                  <div className="action-item">
                    {note_count}
                    {' '}
                    <Icon source={Svgs.iconComment} color="gray" />
                  </div>
                )
              }
              <div className="action-item">
                <Badge {...statusPropsList[status]} />
                {this.renderRedesign()}
              </div>
              <div
                className={classnames({
                  'action-item': true
                })}
              >
                <div
                  className={classnames({
                    opened: isOpen,
                    arrow: true
                  })}
                >
                  <Icon color="gray" source={Svgs.iconChevronDown} />
                </div>
              </div>
            </div>
          </div>
          <TaskPanelProgress tasks={data.tasks} />
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>
            {
              (data.tasks && data.tasks.length > 0) && (
                <div className="board-tasks">
                  {
                    data.tasks.map((task, index) => (
                      <TaskPanelItem
                        user={user}
                        users={users}
                        data={task}
                        key={`${index}`}
                        onClick={onItemClick}
                        onCompleteChange={onItemCompleteChange}
                        onAssigneeChange={onItemAssigneeChange}
                        onVerifierChange={onItemVerifierChange}
                        editable={editable} />
                    ))
                  }
                </div>
              )
            }
            {
              editable && (
                <Button
                  color="yale"
                  onClick={onAdd}
                  className="mt-4"
                >
                  <Icon source={Svgs.iconPlus} color="white" />
                  Add a task
                </Button>
              )
            }
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

TaskPanel.defaultProps = {
  data: {},
  isOpen: true,
  editable: false,
  users: [],
  user: null,
  onAdd: () => {},
  onItemClick: () => {},
  onItemCompleteChange: () => {},
  onItemAssigneeChange: () => {},
  onItemVerifierChange: () => {}
};

export default TaskPanel;
