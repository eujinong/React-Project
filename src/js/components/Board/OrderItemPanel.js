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
import OrderItemPanelItem from './OrderItemPanelItem';
import { TASK_STATUS } from '../../configs/enums';

class OrderItemPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen
    };
  }

  get status() {
    const {
      data
    } = this.props;
    let status = 'in-review';

    if (data.tasks && data.tasks.length > 0) {
      let completenessCount = 0;
      for (let i = 0, ni = data.tasks.length; i < ni; i++) {
        const task = data.tasks[i];
        if (task.status === TASK_STATUS.COMPLETED) {
          completenessCount++;
        }
      }

      if (completenessCount < data.tasks.length) {
        status = TASK_STATUS.IN_PROGRESS;
      } else {
        status = 'closed';
      }
    }
    return status;
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {
      isOpen
    } = this.state;

    const {
      data, className, onAdd, onItemClick, onItemCompleteChange
    } = this.props;

    const {
      status
    } = this;

    const statusPropsList = {
      closed: {
        children: 'Closed',
        color: 'secondary'
      },
      in_progress: {
        children: 'In progress',
        color: 'warning'
      },
      in_review: {
        children: 'In Review',
        color: 'secondary'
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
          <div className="panel-top">
            <div className="panel-title">
              {data.title}
            </div>
            <div className="panel-action">
              {
                data.flags > 0 && (
                  <div className="action-item">
                    {data.flags}
                    {' '}
                    <Icon source={Svgs.iconFlag} color="gray" />
                  </div>
                )
              }
              <div className="action-item">
                <Badge {...statusPropsList[status]} />
              </div>
              <div
                className={classnames({
                  'action-item': true,
                  'cursor-pointer': true,
                  'is-open': isOpen
                })}
                onClick={this.handleToggle.bind(this)}
                role="presentation"
              >
                <Icon color="gray" source={Svgs.iconChevronDown} />
              </div>
            </div>
          </div>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>
            {
              (data.tasks && data.tasks.length > 0) && (
                <div className="board-tasks">
                  {
                    data.tasks.map((task, index) => (
                      <OrderItemPanelItem data={task} key={`${index}`} onClick={onItemClick} onCompleteChange={onItemCompleteChange} />
                    ))
                  }
                </div>
              )
            }

            <Button
              color="yale"
              onClick={onAdd}
              className="mt-4"
            >
              <Icon source={Svgs.iconPlus} color="white" />
              Add a task
            </Button>
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

OrderItemPanel.defaultProps = {
  data: {},
  isOpen: true,
  onAdd: () => {},
  onItemClick: () => {},
  onItemCompleteChange: () => {}
};

export default OrderItemPanel;
