import React, { Component } from 'react';
import moment from 'moment';
import classnames from 'classnames';

import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';

import BoardDueAt from './BoardDueAt';
import AvatarGroup from '../Avatars/AvatarGroup';
import UserSelect, { UserSelectPlaceholder } from '../FormControls/UserSelect';
import { TASK_STATUS, USER_ROLE } from '../../configs/enums';

import {
  Badge,
} from 'reactstrap';

class TaskPanelItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignee: {},
      verifier: {}
    };
  }

  componentDidMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialize(nextProps);
  }

  initialize(props) {
    const { data, users } = props;
    this.setState({
      assignee: data.assignees && data.assignees.length > 0 ? users.find(element => (element.id === data.assignees[0].id)) : null,
      verifier: data.verifiers && data.verifiers.length > 0 ? users.find(element => (element.id === data.verifiers[0].id)) : null
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
      data, /* onCompleteChange, */ editable, onClick, className, users, user,
      onAssigneeChange, onVerifierChange
    } = this.props;

    const { assignee, verifier } = this.state;
    const date = moment(moment(data.due_at).format('YYYY-MM-DD'), 'YYYY-MM-DD');
    const today = moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD');
    const diffInDays = date.diff(today, 'days');
    const classNameMap = {
      'board-task-item': true,
      'bg-ivory': (data.status !== TASK_STATUS.VERIFIED && diffInDays === 0) || (data.status === TASK_STATUS.IN_PROGRESS),
      'bg-honeydew': data.status === TASK_STATUS.VERIFIED,
      'bg-unclickable': user && (user.access.role === USER_ROLE.HR || user.access.role === USER_ROLE.ACCOUNTS || user.access.role === USER_ROLE.DESIGNER)
              && (
                (!assignee && !verifier)
                || (!assignee && verifier && verifier.id !== user.id)
                || (assignee && !verifier && assignee.id !== user.id)
                || ((assignee && verifier) && (assignee.id !== user.id && verifier.id !== user.id))
              )
    };

    if (className) {
      classNameMap[className] = true;
    }

    return (
      <div
        className={classnames(classNameMap)}
      >
        <div className="background-unclickable" />
        <div
          className="board-task-item-left"
          role="presentation"
          onClick={() => { onClick(data); }}
        >
          <div>
            {data.title}
          </div>
          <div>
            {!(data.status === TASK_STATUS.VERIFIED || data.status === TASK_STATUS.VERIFIED) && data.due_at && <BoardDueAt date={data.due_at} />}
          </div>
          <div>
            {this.renderRedesign()}
          </div>
        </div>
        <div
          style={{ flex: 1 }}
          onClick={() => { onClick(data); }}
          role="presentation"
        />
        <div
          className="board-task-item-right"
          role="presentation"
        >
          {
            (data.note_count > 0) && (
              <div>
                {data.note_count}
                <Icon source={Svgs.iconComment} color="gray" />
              </div>
            )
          }
          <div>
            {
              (data.onhold === 1 && <b className="text-danger">TASK ON HOLD</b>)
              || (data.status === TASK_STATUS.PENDING_VERIFICATION && <b className="text-warning">In Review!</b>)
              || (data.status === TASK_STATUS.IN_PROGRESS && <b className="text-warning">In Progress!</b>)
              || (data.status === TASK_STATUS.TODO && <b className="text-primary">To do!</b>)
              || (data.status === TASK_STATUS.VERIFIED && <b className="text-success">Completed!</b>)
            }
          </div>
          <div>
            {data.due_at && <span>{moment(data.due_at).format('D MMM')}</span>}
          </div>
          {
            editable && (
              <div className="board-task-users">
                {
                  assignee && (
                    <div className="assignees">
                      <UserSelect
                        placeholder={(
                          <UserSelectPlaceholder user={{ symbol: '✛', name: 'Not assigned' }} />
                        )}
                        // isMulti
                        options={users}
                        getOptionLabel={option => `${option.name} ${option.title}`}
                        getOptionValue={option => `${option.id}`}
                        value={assignee}
                        onChange={(value) => { onAssigneeChange(data, value); }}
                      />
                    </div>
                  )
                }
                {
                  verifier && (
                    <div className="verifiers">
                      <UserSelect
                        placeholder={(
                          <UserSelectPlaceholder user={{ symbol: '✛', name: 'Verifier not assigned' }} />
                        )}
                        // isMulti
                        options={users}
                        getOptionLabel={option => `${option.name} ${option.title}`}
                        getOptionValue={option => `${option.id}`}
                        value={verifier}
                        onChange={(value) => { onVerifierChange(data, value); }}
                      />
                    </div>
                  )
                }
              </div>
            )
          }
          <div>
            {data.status_changed_at && <span>{moment(data.status_changed_at).format('D MMM')}</span>}
          </div>
          {
            !editable && (
              <div>
                <AvatarGroup users={data.assignees} verifiers={data.verifiers} />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

TaskPanelItem.defaultProps = {
  data: {},
  onClick: () => {},
  onCompleteChange: () => {},
  onAssigneeChange: () => {},
  onVerifierChange: () => {},
  editable: false,
  users: [],
  user: null
};

export default TaskPanelItem;
