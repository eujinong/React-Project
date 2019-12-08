import React, { Component } from 'react';
import {
  CustomInput
} from 'reactstrap';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import Item from './Item';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      data,
      workflows,
      users,
      taskTitles,
      taskLists,
      onDataChange,
      onSelect,
      onSelectAll,
      onEditComment,
      onEditable,
      onSaveComment
    } = this.props;
    return (
      <div className="main-content">
        <div className="assignee-table">
          <StickyTable>
            <Row>
              <Cell>
                <div className="all-checkbox">
                  <CustomInput className="order-checkbox" type="checkbox" id="assignees_select_all" label="Order number" onChange={(event) => { onSelectAll(event.target.checked); }} />
                </div>
              </Cell>
              <Cell>
                Workflows
              </Cell>
              {
                taskTitles && taskTitles.map((title, index) => (
                  <Cell key={`${index}`}>
                    {title}
                  </Cell>
                ))
              }
              <Cell>
                Proposed design
              </Cell>
              <Cell>
                Comments
              </Cell>
            </Row>
            {
              data.length > 0 && (
                data.map((item, index) => (
                  <Item
                    key={index}
                    data={item.data}
                    applyFailed={item.applyFailed}
                    selected={item.selected}
                    users={users}
                    workflows={workflows}
                    taskTitles={taskTitles}
                    taskLists={taskLists}
                    onSelect={(selected) => { onSelect(index, selected); }}
                    onChange={(value) => { onDataChange(index, value); }}
                    editableProposed={item.editableProposed}
                    editableComments={item.editableComments}
                    onEditComment={(type, value) => { onEditComment(index, type, value); }}
                    onEditable={(type) => { onEditable(index, type); }}
                    onSaveComment={(type) => { onSaveComment(index, type); }}
                  />
                ))
              )
            }
            <Row>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              {
                taskTitles && taskTitles.map((title, index) => (
                  <Cell key={`${index}`} />
                ))
              }
            </Row>
          </StickyTable>
        </div>
      </div>
    );
  }
}

Main.defaultProps = {
  data: {},
  users: [],
  taskTitles: [],
  taskLists: [],
  workflows: [],
  onDataChange: () => {},
  onSelect: () => {},
  onEditComment: () => {},
  onEditable: () => {},
  onSaveComment: () => {}
};

export default Main;
