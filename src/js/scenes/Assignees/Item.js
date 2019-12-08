/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import {
  CustomInput, Button
} from 'reactstrap';
import { Row, Cell } from 'react-sticky-table';
import Textarea from 'react-textarea-autosize';
import Icon from '../../components/Utilities/Icon';
import { Svgs } from '../../theme';
import UserSelect, { UserSelectPlaceholder } from '../../components/FormControls/UserSelect';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleTaskAssigneeChange(task, value) {
    task.assignees = [value];
    const {
      data, onChange
    } = this.props;

    if (data.tasks) {
      const taskItem = data.tasks.find(item => item.id === task.id);
      if (taskItem) {
        for (let i = 0; i < data.tasks.length; i++) {
          const item = data.tasks[i];
          if (item.id === task.id) {
            item.assignees = task.assignees;
          }
        }
      } else {
        data.tasks.push(task);
      }
    } else {
      data.tasks = [task];
    }
    onChange(data);
  }

  handleTaskVerifierChange(task, value) {
    task.verifiers = [value];
    const {
      data, onChange
    } = this.props;

    if (data.tasks) {
      const taskItem = data.tasks.find(item => item.id === task.id);
      if (taskItem) {
        for (let i = 0; i < data.tasks.length; i++) {
          const item = data.tasks[i];
          if (item.id === task.id) {
            item.verifiers = task.verifiers;
          }
        }
      } else {
        data.tasks.push(task);
      }
    } else {
      data.tasks = [task];
    }
    onChange(data);
  }

  handleWorkflowChange(value) {
    const {
      data, onChange
    } = this.props;
    data.workflow = value;

    // clone all tasks within order so that we don't alter them on the workflow level
    data.tasks = data.workflow.tasks.map(data => JSON.parse(JSON.stringify(data)));
    onChange(data);
  }

  render() {
    const {
      data,
      applyFailed,
      selected,
      workflows,
      users,
      taskTitles,
      taskLists,
      onSelect,
      onEditable,
      onEditComment,
      onSaveComment,
      editableProposed,
      editableComments
    } = this.props;
    const classNameMap = {
      selected: false,
      applyFailed: false
    };

    if (data.workflow) {
      classNameMap.selected = true;
    }
    if (applyFailed) {
      classNameMap.applyFailed = true;
    }

    return (
      <Row className={
        classnames(classNameMap)}
      >
        <Cell>
          <div className="order-content">
            <CustomInput
              type="checkbox"
              id={`assignee_${data.id}`}
              label={data.number}
              checked={selected}
              onChange={(event) => { onSelect(event.target.checked); }}
            />
            <div className="ml-5">
              <div className="d-flex">
                <div className="mr-2">
                  <span>ST:</span>
                  {data.service_type && data.service_type.slice(0, 2)}
                </div>
                <div>
                  <span>SoT:</span>
                  {data.service_of_type ? data.service_of_type : (data.service_type && data.service_type.slice(3))}
                </div>
              </div>
              <div>
                <span>FNN:</span>
                {data.fnn}
              </div>
            </div>
          </div>
        </Cell>
        <Cell>
          <Select
            placeholder="Select workflow"
            menuPlacement="auto"
            maxMenuHeight={240}
            classNamePrefix="react-select"
            indicatorSeparator={null}
            options={workflows}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.title}
            value={data.workflow}
            components={{
              DropdownIndicator: () => (<Icon source={Svgs.iconCaretDown} />),
              ClearIndicator: () => null
            }}
            onChange={this.handleWorkflowChange.bind(this)}
          />
        </Cell>
        {
          taskTitles && taskTitles.length > 0 && taskTitles.map((title, index) => {
            // try to get task from order first, not from workflow
            let task = data.tasks ? data.tasks.find(task => (task.title === title)) : null;
            if (!task) {
              task = data.workflow ? data.workflow.tasks.find(task => (task.title === title)) : taskLists.find((task => (task.title === title)));
            }

            return (
              <Cell key={`${index}`}>
                {
                  task && (
                    <Fragment>
                      {
                        <div className="assignees mb-2">
                          <UserSelect
                            placeholder={(
                              <UserSelectPlaceholder user={{ symbol: '✛', name: 'Not assigned' }} />
                            )}
                            options={users}
                            getOptionLabel={option => `${option.name}`}
                            getOptionValue={option => `${option.id}`}
                            value={task.assignees && task.assignees.length > 0 ? users.find(element => (element.id === task.assignees[0].id)) : null}
                            onChange={this.handleTaskAssigneeChange.bind(this, task)}
                          />
                        </div>
                      }
                      {
                        task.verifiable === 1
                          ? (
                            <div className="verifiers">
                              <UserSelect
                                placeholder={(
                                  <UserSelectPlaceholder user={{ symbol: '✛', name: 'Verifier not assigned' }} />
                                )}
                                options={users}
                                getOptionLabel={option => `${option.name}`}
                                getOptionValue={option => `${option.id}`}
                                value={task.verifiers && task.verifiers.length > 0 ? users.find(element => (element.id === task.verifiers[0].id)) : null}
                                onChange={this.handleTaskVerifierChange.bind(this, task)}
                              />
                            </div>
                          ) : <div className="verifiers" />
                      }
                      <div className="row-locked" />
                    </Fragment>
                  )
                }
              </Cell>
            );
          })
        }
        <Cell>
          {
            editableProposed ? (
              <Fragment>
                <div className="comment">
                  <Textarea
                    name="proposed_design"
                    className="form-control"
                    minRows={4}
                    maxRows={12}
                    value={data.proposed_design_solution}
                    onChange={e => onEditComment('proposed', `${e.target.value}`)}
                  />
                </div>
                <Button
                  type="button"
                  color="grey"
                  size="sm"
                  onClick={() => onSaveComment('proposed')}
                >
                  Save
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <div className="comment">
                  {data.proposed_design_solution}
                </div>
                <Button
                  type="button"
                  outline
                  color="grey"
                  className="comment-edit"
                  size="sm"
                  onClick={() => onEditable('proposed')}
                >
                  Edit
                  {' '}
                  <Icon source={Svgs.iconEdit} size="sm" />
                </Button>
              </Fragment>
            )
          }
        </Cell>
        <Cell>
          {
            editableComments ? (
              <Fragment>
                <div className="comment">
                  <Textarea
                    name="comments"
                    className="form-control"
                    value={data.comments}
                    minRows={4}
                    maxRows={12}
                    onChange={e => onEditComment('comments', `${e.target.value}`)}
                  />
                </div>
                <Button
                  type="button"
                  color="grey"
                  size="sm"
                  onClick={() => onSaveComment('comments')}
                >
                  Save
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <div className="comment">
                  {data.comments}
                </div>
                <Button
                  type="button"
                  outline
                  color="grey"
                  size="sm"
                  className="comment-edit"
                  onClick={() => onEditable('comments')}
                >
                  Edit
                  {' '}
                  <Icon source={Svgs.iconEdit} size="sm" />
                </Button>
              </Fragment>
            )
          }
        </Cell>
      </Row>
    );
  }
}

Item.defaultProps = {
  data: {},
  applyFailed: false,
  users: [],
  workflows: [],
  taskTitles: [],
  taskLists: [],
  selected: false,
  editableProposed: false,
  editableComments: false,
  onSelect: () => {},
  onChange: () => {},
  onEditable: () => {},
  onEditComment: () => {},
  onSaveComment: () => {}
};

export default Item;
