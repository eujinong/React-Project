/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './partials/Header';
import NotificationBar from '../components/Notifications/NotificationBar';
import {
  setNotifications,
  setReport,
  removeNotificationGroup,
  removeNotification,
  addNotification
} from '../actions/common';
import Api from '../apis/app';
import Echo from '../apis/echo';

class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleNotification = this.toggleNotification.bind(this);
    this.handleNotificationGroupClose = this.handleNotificationGroupClose.bind(this);
    this.handleNotificationClose = this.handleNotificationClose.bind(this);
    this.handleNotificationClearAll = this.handleNotificationClearAll.bind(this);
  }

  async componentDidMount() {
    const { response, body } = await Api.get('v1/notifications/unread');
    switch (response.status) {
      case 200:
        this.props.setNotifications(body.data);
        break;
      default:
        break;
    }

    this.bootstrapEcho();
  }

  componentWillReceiveProps(props) {
    if (this.props.user) {
      this.bootstrapEcho();
    }
  }

  bootstrapEcho() {
    if (this.state.echo) {
      return;
    }

    console.log('Trying to bootstrap Echo...');

    if (Api.getAuth().access_token || null) {
      Echo.onUserNotification(this.props.user, (notification) => {
        this.props.addNotification(notification.content);
      });

      const userRole = this.props.user.access.role;
      const hasAccessToReports = userRole === 'god' || userRole === 'accounts';

      if (hasAccessToReports) {
        Echo.onReportGenerated((report) => {
          report.progress = 100;
          this.props.setReport(report);
        });
        Echo.onReportProgress((report, progress) => {
          report.progress = progress;
          this.props.setReport(report);
        });
      }

      this.setState({
        echo: true
      });

      console.log('Echo bootstrapped successfully.');
    }
  }

  toggleNotification() {
    document.body.classList.toggle('notification-bar-opened');
  }

  handleNotificationGroupClose(notificationGroup) {
    this.props.removeNotificationGroup(notificationGroup);
  }

  async handleNotificationClose(notificationGroup, notification) {
    const { response } = await Api.post(`v1/notifications/${notification.id}/read`, { read: 1 });
    switch (response.status) {
      case 200:
        this.props.removeNotification(notificationGroup, notification);
        break;
      default:
        break;
    }
  }

  async handleNotificationClearAll() {
    const { response } = await Api.post('v1/notifications/clear');
    switch (response.status) {
      case 200:
        this.props.setNotifications([]);
        break;
      default:
        break;
    }
  }

  render() {
    const {
      notificationGroups, user
    } = this.props;
    return (
      <div className="site">
        <Header
          toggleNotification={this.toggleNotification}
        />
        <NotificationBar
          user={user}
          data={notificationGroups}
          toggle={this.toggleNotification}
          onNotificationGroupClose={this.handleNotificationGroupClose}
          onNotificationClose={this.handleNotificationClose}
          onNotificationClearAll={this.handleNotificationClearAll}
        />
        <div className="site-main">
          {this.props.children}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.common.notifications,
  notificationGroups: state.common.notificationGroups,
  user: state.common.auth ? state.common.auth.profile : null
});

const mapDispatchToProps = dispatch => ({
  setReport: bindActionCreators(setReport, dispatch),
  setNotifications: bindActionCreators(setNotifications, dispatch),
  addNotification: bindActionCreators(addNotification, dispatch),
  removeNotification: bindActionCreators(removeNotification, dispatch),
  removeNotificationGroup: bindActionCreators(removeNotificationGroup, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Full);
