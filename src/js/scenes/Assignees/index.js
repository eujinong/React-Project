/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  connect
} from 'react-redux';
import {
  Container
} from 'reactstrap';
import ReactNotification from 'react-notifications-component';
import Api from '../../apis/app';
import Action from './Action';
import Main from './Main';
import Prompt from '../../components/Modals/Prompt';

class Assignees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      workflows: [],
      taskTitles: [],
      taskLists: [],
      isSubmitting: false,
      isDeleting: false,
      showConfirmation: false,
      confirmationMessage: ''
    };

    this.handleAssigneesApply = this.handleAssigneesApply.bind(this);
    this.handleDeleteSelected = this.handleDeleteSelected.bind(this);
    this.handleShowConfirmation = this.handleShowConfirmation.bind(this);
    this.handleConfirmationClose = this.handleConfirmationClose.bind(this);

    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
    this.handleEditable = this.handleEditable.bind(this);
    this.handleSaveComment = this.handleSaveComment.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  async componentDidMount() {
    const res = await Api.get('v1/workflows/assignment');
    const {
      response: response1, body: body1
    } = res;
    switch (response1.status) {
      case 200:
        await this.setState({
          workflows: body1.data
        });
        break;
      default:
        break;
    }
    const tasks = this.getTaskTitleList();
    await this.setState({
      taskTitles: tasks
    });
    const taskLists = this.getTaskList();
    await this.setState({
      taskLists
    });

    const {
      response, body
    } = await Api.get('v1/orders/imported');
    switch (response.status) {
      case 422:
        break;
      case 200: {
        const orders = body.data;
        const data = orders.map(item => ({
          applyFailed: false,
          selected: false,
          data: {
            workflow: item.workflow_id && body1.data ? body1.data.find(e => e.id === item.workflow_id) : null,
            tasks: item.workflow_id && body1.data ? body1.data.find(e => e.id === item.workflow_id).tasks.map(task => JSON.parse(JSON.stringify(task))) : null,
            ...item
          }
        }));

        await this.setState({
          data
        });
        break;
      }
      default:
        break;
    }
  }

  getTaskList() {
    const {
      workflows, taskLists
    } = this.state;
    for (let i = 0, ni = workflows.length; i < ni; i++) {
      const item = workflows[i];
      if (item.tasks && item.tasks.length > 0) {
        const { tasks } = item;
        for (let j = 0, nj = tasks.length; j < nj; j++) {
          const task = tasks[j];
          taskLists.push(task);
        }
      }
    }
    return taskLists;
  }

  getTaskTitleList() {
    const {
      workflows, taskTitles
    } = this.state;
    for (let i = 0, ni = workflows.length; i < ni; i++) {
      const item = workflows[i];
      if (item.tasks && item.tasks.length > 0) {
        const { tasks } = item;
        for (let j = 0, nj = tasks.length; j < nj; j++) {
          const task = tasks[j];
          if (taskTitles.indexOf(task.title) === -1) {
            taskTitles.push(task.title);
          }
        }
      }
    }
    return taskTitles;
  }

  addNotification(type, assignments, assignmentFailApply) {
    this.notificationDOMRef.current.addNotification({
      message: type === 'success' ? (assignments.length && (assignments.length === 1 ? '1 row successfully applied' : `${assignments.length} rows successfully applied`))
        : (type === 'warning' ? (assignmentFailApply.length && (assignmentFailApply.length === 1 ? '1 incomplete row, please review.' : `${assignmentFailApply.length} incomplete rows, please review.`)) : (type === 'danger' && 'Internal server error')),
      type,
      insert: 'top',
      container: 'top-center',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 5000 }
    });
  }

  handleShowConfirmation() {
    const { data } = this.state;
    let delOrders = 0;
    for (let i = 0; i < data.length; i++) {
      const order = data[i];
      if (order.selected === true) {
        delOrders++;
      }
    }

    if (delOrders > 0) {
      this.setState({
        confirmationMessage: `Are you sure you want to delete ${delOrders} rows?`,
        showConfirmation: true
      });
    }
  }

  handleConfirmationClose() {
    this.setState({
      confirmationMessage: '',
      showConfirmation: false
    });
  }

  async handleDeleteSelected() {
    this.handleConfirmationClose();

    const { data } = this.state;
    this.setState({
      isDeleting: true
    });
    const delOrders = [];
    for (let i = 0; i < data.length; i++) {
      const order = data[i];
      if (order.selected === true) {
        delOrders.push(order.data.id);
      }
    }
    const res = await Api.post('v1/orders/delete', { orders: delOrders });
    const { response } = res;
    switch (response.status) {
      case 200:
        this.setState({
          isDeleting: false,
          data: data.filter(item => !delOrders.includes(item.data.id))
        });
        break;
      default:
        break;
    }
  }

  async handleAssigneesApply() {
    const { data } = this.state;
    this.setState({
      isSubmitting: true
    });
    const params = {};
    const assignments = [];
    for (let i = 0; i < data.length; i++) {
      const order = data[i];
      if (!order.data.tasks) {
        order.data.tasks = [];
      }
      if (order.data.workflow && order.data.tasks) {
        const assignment = {
          order_id: order.data.id,
          workflow_id: order.data.workflow.id,
          tasks: {}
        };
        for (let j = 0; j < order.data.tasks.length; j++) {
          const taskItem = order.data.tasks[j];
          const task = {};
          if (taskItem.verifiers && taskItem.verifiers.length > 0) {
            task.verifier = taskItem.verifiers[0].id;
          }
          if (taskItem.assignees && taskItem.assignees.length > 0) {
            task.assignee = taskItem.assignees[0].id;
          }
          assignment.tasks[taskItem.id] = task;
        }
        assignments.push(assignment);
      } else {
        order.data.workflow = null;
      }
      params.assignments = assignments;
    }
    const assignmentFailApply = [];
    const assignmentSuccessApply = [];
    const res = await Api.post('v1/orders/assignment', params, { 'Content-Type': 'application/json' });
    const { response, body } = res;
    switch (response.status) {
      case 200:
        if (body && body.length > 0) {
          for (let ni = 0; ni < body.length; ni++) {
            const applyStatus = body[ni];
            if (applyStatus.success === false) {
              assignmentFailApply.push(applyStatus.order_id);
            }
            if (applyStatus.success === true) {
              assignmentSuccessApply.push(applyStatus.order_id);
            }
          }
          if (assignmentSuccessApply && assignmentSuccessApply.length > 0) {
            await this.setState({
              data: data.filter(item => !assignmentSuccessApply.includes(item.data.id)),
              isSubmitting: false
            });
            this.addNotification('success', assignmentSuccessApply, []);
          }
          if (assignmentFailApply && assignmentFailApply.length > 0) {
            for (let nj = 0; nj < data.length; nj++) {
              const order = data[nj];
              for (let mi = 0; mi < assignmentFailApply.length; mi++) {
                const failOrder = assignmentFailApply[mi];
                if (order.data.id === failOrder) {
                  order.applyFailed = true;
                }
              }
            }
            await this.setState({
              data: data.filter(item => !assignmentSuccessApply.includes(item.data.id)),
              isSubmitting: false
            });
            this.addNotification('warning', [], assignmentFailApply);
          }
        } else {
          this.setState({
            isSubmitting: false
          });
        }
        break;
      case 500:
        this.addNotification('danger', [], []);
        this.setState({
          isSubmitting: false
        });
        break;
      default:
        break;
    }
  }

  handleSelectAll(selected) {
    const {
      data
    } = this.state;
    data.forEach((value) => {
      value.selected = selected;
    });
    this.setState({
      data
    });
  }

  handleSelect(index, selected) {
    const {
      data
    } = this.state;
    data[index].selected = selected;
    this.setState({
      data
    });
  }

  handleDataChange(index, value) {
    const {
      data
    } = this.state;

    for (let i = 0; i < data.length; i++) {
      const order = data[i];
      if (order.selected === true && data[index].selected === true) {
        if (value.workflow) {
          data[i].data.workflow = value.workflow;
          data[index].applyFailed = false;
        }
        if (value.tasks) {
          data[i].data.tasks = JSON.parse(JSON.stringify(value.tasks));
          data[index].applyFailed = false;
        }
      } else {
        data[index].data = value;
        data[index].applyFailed = false;
      }
    }
    this.setState({
      data
    });
  }

  handleEditComment(index, type, value) {
    const { data } = this.state;
    for (let j = 0; j < data.length; j++) {
      const order = data[j];
      if (order.data.id === data[index].data.id) {
        if (type === 'proposed') {
          order.data.proposed_design_solution = value;
        }
        if (type === 'comments') {
          order.data.comments = value;
        }
      }
    }
    this.setState({
      data
    });
  }

  handleEditable(index, type) {
    const { data } = this.state;
    if (type === 'proposed') {
      for (let k = 0; k < data.length; k++) {
        const order = data[k];
        if (order.data.id === data[index].data.id) {
          order.editableProposed = true;
        }
      }
    }
    if (type === 'comments') {
      for (let k = 0; k < data.length; k++) {
        const order = data[k];
        if (order.data.id === data[index].data.id) {
          order.editableComments = true;
        }
      }
    }
    this.setState({
      data
    });
  }

  async handleSaveComment(index, type) {
    const { data } = this.state;
    const { response, body } = await Api.post(`v1/orders/${data[index].data.id}/update`, {
      proposed_design_solution: data[index].data.proposed_design_solution,
      comments: data[index].data.comments
    });
    switch (response.status) {
      case 200:
        console.log(body.data);
        break;
      default:
        break;
    }
    for (let l = 0; l < data.length; l++) {
      const order = data[l];
      if (order.data.id === data[index].data.id) {
        if (type === 'proposed') {
          order.editableProposed = false;
        }
        if (type === 'comments') {
          order.editableComments = false;
        }
      }
    }
    this.setState({
      data
    });
  }

  render() {
    const {
      data, workflows, taskTitles, taskLists, isSubmitting, isDeleting, showConfirmation, confirmationMessage
    } = this.state;

    const { users } = this.props;
    return (
      <Container fluid>
        <ReactNotification ref={this.notificationDOMRef} />
        <Action
          data={data}
          isSubmitting={isSubmitting}
          isDeleting={isDeleting}
          onDeleteSelected={this.handleShowConfirmation}
          onAssigneesApply={this.handleAssigneesApply}
        />
        <Main
          data={data}
          users={users}
          onSelectAll={this.handleSelectAll}
          workflows={workflows}
          taskTitles={taskTitles}
          taskLists={taskLists}
          onSelect={this.handleSelect}
          onDataChange={this.handleDataChange}
          onEditComment={this.handleEditComment}
          onEditable={this.handleEditable}
          onSaveComment={this.handleSaveComment}
        />
        {showConfirmation && <Prompt title={confirmationMessage} handleAccept={this.handleDeleteSelected} handleCancel={this.handleConfirmationClose} />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.common.auth ? state.common.auth.profile : null,
  users: state.common.users
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Assignees));
