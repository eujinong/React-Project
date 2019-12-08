import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route, Switch, Redirect
} from 'react-router-dom';

import Layout from '../layouts/Full';

import Orders from './Orders';
import OrderDetail from './OrderDetail';
import Tasks from './Tasks';
import Assignees from './Assignees';
import Reports from './Reports';
import Profile from './Profile';

import Api from '../apis/app';
import { login, setUsers } from '../actions/common';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  async componentDidMount() {
    const auth = Api.getAuth();
    if (auth && !this.props.auth) {
      await this.props.login(auth);
    }
    await this.setState({
      authenticated: true
    });

    const {
      users
    } = this.props;

    if (users && users.length > 0) {
      return;
    }

    const {
      response, body
    } = await Api.get('v1/users');

    // const users = OptionsHelper.getUserOptions(body.data);
    switch (response.status) {
      case 422:
        break;
      case 200: {
        this.props.setUsers(body.data);
        break;
      }
      default:
        break;
    }
  }

  render() {
    const {
      authenticated
    } = this.state;
    return (
      <Layout>
        {
          authenticated && (
            <Switch>
              <Route component={Profile} path="/profile" />
              <Route component={Assignees} path="/assignees" />
              <Route component={OrderDetail} path="/orders/:id" />
              <Route exact component={Orders} path="/orders" />
              <Route component={Reports} path="/reports" />
              <Route component={Tasks} path="/tasks" />
              <Redirect from="/" to="tasks" />
            </Switch>
          )
        }
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.common.auth,
  users: state.common.users
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch),
  setUsers: bindActionCreators(setUsers, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
