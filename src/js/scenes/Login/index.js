import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import {
  Container,
  Card, CardHeader, CardBody,
  Form, FormGroup, FormFeedback, Label, Input,
  UncontrolledAlert,
  Button
} from 'reactstrap';
import { Formik } from 'formik';
import Yup from 'yup';

import { login } from '../../actions/common';
import Layout from '../../layouts/Bone';
import { Images, Svgs } from '../../theme';
import Api from '../../apis/app';
import Icon from '../../components/Utilities/Icon';

import envLabels from '../../configs/envLabels';
import ENV from '../../configs/env';

class Login extends Component {
  componentDidMount() {
    const auth = Api.getAuth();
    if (auth) {
      this.login(auth);
    }
  }

  async login(auth) {
    await this.props.login(auth);
    this.props.history.push('/');
  }

  async handleSubmit(values, bags) {
    const data = await Api.post('auth/login', values);
    const {
      body, response
    } = data;
    switch (response.status) {
      case 422:
        if (body.message) {
          bags.setStatus({
            color: 'danger',
            children: body.message
          });
        }
        bags.setErrors(body.errors);
        break;
      case 200:
        await this.login(body);
        break;
      default:
        break;
    }
    bags.setSubmitting(false);
  }

  render() {

    const showEnvBanner = !! ENV.ENV_LABEL_KEY && envLabels[ENV.ENV_LABEL_KEY] !== 'undefined';
    let envBannerConfig = null;
    if (showEnvBanner) {
      envBannerConfig = envLabels[ENV.ENV_LABEL_KEY];
    }

    return (
      <div>
        {
          showEnvBanner && (
            <div className="environment-banner" style={envBannerConfig.styles}>{ envBannerConfig.text }</div>
          )
        }
        <Layout>
          <Container>
            <div className="case case-sm">
              <div className="case-body">
                <Card className="card-login">
                  <CardHeader>
                    <div className="brand-logo">
                      <img src={Images.logoText} alt="Timmitool" />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Formik
                      initialValues={{
                        email: '',
                        password: ''
                      }}
                      validationSchema={
                        Yup.object().shape({
                          email: Yup.string().required('Email is required!'), //.email('Email is not valid!'),
                          password: Yup.string().min(6, 'Password has to be longer than 6 characters!').required('Password is required!')
                        })
                      }
                      onSubmit={this.handleSubmit.bind(this)}
                      render={({
                        values,
                        errors,
                        status,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          {status && <UncontrolledAlert {...status} />}
                          <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input
                              type="text"
                              name="email"
                              id="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={touched.email && !!errors.email}
                            />
                            <FormFeedback>{errors.email}</FormFeedback>
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input
                              type="password"
                              name="password"
                              id="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={touched.password && !!errors.password}
                            />
                            <FormFeedback>{errors.password}</FormFeedback>
                          </FormGroup>
                          <FormGroup>
                            <Button
                              disabled={isSubmitting}
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              {
                                isSubmitting && (
                                  <Fragment>
                                    <Icon source={Svgs.iconLoading} spin />
                                    &nbsp;
                                  </Fragment>
                                )
                              }
                              Login
                            </Button>
                          </FormGroup>
                        </Form>
                      )}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
