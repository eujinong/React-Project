import React, { Component, Fragment } from 'react';
import {
  Alert, Button, Input, Form
} from 'reactstrap';
import { Formik } from 'formik';
import Yup from 'yup';
import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';
import { TASK_DEFAULT_TITLES } from '../../configs/enums';

class TaskAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyValue: false
    };
    this.formikRef = React.createRef();
  }

  handleSubmit(type, values) {
    const { onAccept, onReject } = this.props;
    if (type === 'accept') {
      onAccept(values);
      this.formikRef.current.setValues({
        message: '',
        email: ''
      });
    }
    if (type === 'reject') {
      if (values.message !== '') {
        onReject(values);
        this.formikRef.current.setValues({
          message: '',
          email: ''
        });
      } else {
        this.setState({
          emptyValue: true
        });
      }
    }
  }

  render() {
    const {
      isAccepting, isRejecting, onAccept, onReject, data, users, ...otherProps
    } = this.props;
    const { emptyValue } = this.state;
    return (
      <Fragment>
        <Formik
          ref={this.formikRef}
          initialValues={{
            message: '',
            email: ''
          }}
          validationSchema={
            Yup.object().shape({
              message: Yup.string().required('Message is required!')
            })
          }
          onSubmit={this.handleSubmit.bind(this)}
          render={({
            values,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <Form onSubmit={handleSubmit}>
              <Alert {...otherProps} className="alert-task shadow">
                <Fragment>
                  <div className="content">
                    Please review the contents and approve or reject.
                  </div>
                  <div className="action">
                    <Button color="success mr-2" type="submit" disabled={isAccepting} onClick={this.handleSubmit.bind(this, 'accept', values)}>
                      {
                        isAccepting ? (
                          <Icon source={Svgs.iconLoading} color="white" spin />
                        ) : (
                          <Icon source={Svgs.iconCheck} color="white" circle />
                        )
                      }
                      &nbsp;Verify
                    </Button>
                    <Button color="danger" type="submit" onClick={this.handleSubmit.bind(this, 'reject', values)}>
                      {
                        isRejecting ? (
                          <Icon source={Svgs.iconLoading} color="white" spin />
                        ) : (
                          <Icon source={Svgs.iconCheck} color="white" circle />
                        )
                      }
                      &nbsp;Reject
                    </Button>
                  </div>
                </Fragment>
              </Alert>
              <div className="assigned-verifier">
                <Input
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="textarea"
                  rows={4}
                  placeholder="Additional comments (optional)"
                  invalid={!!emptyValue}
                />
                {
                  data.title === TASK_DEFAULT_TITLES.DESIGN_TEMPLATE && (
                    <div className="send-email">
                      <div>
                        Send to external designer (optional)
                      </div>
                      <Input
                        name="email"
                        type="email"
                        multiple
                        placeholder="Enter an email address"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  )
                }
              </div>
            </Form>
          )}
        />
      </Fragment>
    );
  }
}

TaskAlert.defaultProps = {
  isAccepting: false,
  isRejecting: false,
  data: {},
  onAccept: () => {},
  onReject: () => {},
  users: []
};

export default TaskAlert;
