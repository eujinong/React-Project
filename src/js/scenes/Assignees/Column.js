/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import {
  CustomInput
} from 'reactstrap';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      data,
      selected,
      onSelect
    } = this.props;

    return (
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
            <span>S(FNN):</span>
            {data.fnn}
          </div>
        </div>
      </div>
    );
  }
}

Column.defaultProps = {
  data: {},
  selected: false,
  onSelect: () => {}
};

export default Column;
