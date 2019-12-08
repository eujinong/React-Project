import React, { Component } from 'react';
import {
  Button
} from 'reactstrap';

import Icon from '../../components/Utilities/Icon';
import { Svgs } from '../../theme';

class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableDelete: true,
      enableApply: true
    };
  }

  componentWillReceiveProps(props) {
    const { data } = props;
    for (let i = 0; i < data.length; i++) {
      const order = data[i];
      if (order.selected === true) {
        this.setState({
          enableDelete: false
        });
      }
      if (order.data.workflow || order.data.workflow_id) {
        this.setState({
          enableApply: false
        });
      }
    }
  }

  handleAssignment() {
    const {
      onAssigneesApply, isSubmitting
    } = this.props;

    if (isSubmitting) return;
    onAssigneesApply();
  }

  render() {
    const {
      data, onDeleteSelected, isSubmitting, isDeleting
    } = this.props;
    const { enableApply, enableDelete } = this.state;
    return (
      <div className="actionbar assignees-action">
        <div className="actionbar-item">
          <h3>
            Assign&nbsp;
            <span>{data.length}</span>
            &nbsp;imports
          </h3>
        </div>
        <div className="actionbar-item">
          <div>
            <Button
              disabled={enableDelete}
              color="danger"
              onClick={onDeleteSelected}
              className="mr-1 mr-md-3"
            >
              <Icon source={Svgs.iconTrash} color="white" />
              {isDeleting && <Icon size="sm" spin source={Svgs.iconLoading} className="mr-1" />}
              Delete Selected
            </Button>
            <Button
              disabled={enableApply || isSubmitting}
              color="steel"
              onClick={this.handleAssignment.bind(this)}
            >
              {isSubmitting && <Icon size="sm" spin source={Svgs.iconLoading} className="mr-1" />}
              Apply assignments
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Action.defaultProps = {
  data: {},
  isSubmitting: false,
  isDeleting: false,
  onAction: () => {},
  onDeleteSelected: () => {},
  onAssigneesApply: () => {}
};

export default Action;
