import React, { Component, Fragment } from 'react';
import {
  connect
} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  NavLink as Link, withRouter
} from 'react-router-dom';
import {
  Collapse,
  Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Button
} from 'reactstrap';

import { logout } from '../../actions/common';
import { Images, Svgs } from '../../theme';
import Icon from '../../components/Utilities/Icon';
import ProfileItem from './ProfileItem';
import { USER_ROLE, NOTIFICATION_TYPE } from '../../configs/enums';

import envLabels from '../../configs/envLabels';
import ENV from '../../configs/env';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  async handleLogout() {
    await this.props.logout();
    await this.props.history.replace('/login');
  }

  handleProfile() {
    this.props.history.push('/profile');
  }

  render() {
    const {
      user, notificationGroups, toggleNotification
    } = this.props;

    const showEnvBanner = !! ENV.ENV_LABEL_KEY && envLabels[ENV.ENV_LABEL_KEY] !== 'undefined';
    let envBannerConfig = null;
    if (showEnvBanner) {
      envBannerConfig = envLabels[ENV.ENV_LABEL_KEY];
    }

    return (
      <div className="site-header">
        {
          showEnvBanner && (
            <div className="environment-banner" style={envBannerConfig.styles}>{ envBannerConfig.text }</div>
          )
        }
        <Navbar color="info" dark expand="lg">
          <NavbarBrand tag={Link} to="/">
            <img src={Images.logoText} alt="Timmitool" />
          </NavbarBrand>
          <div>
            <Icon
              source={Svgs.iconNotification}
              color="silver"
              className={notificationGroups && notificationGroups.length > 0 ? 'dot dot-danger cursor-pointer d-lg-none mr-2' : 'dot dot-silver cursor-pointer d-lg-none mr-2'}
              onClick={toggleNotification}
            />
            <NavbarToggler onClick={this.toggle} />
          </div>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {
                user && (user.access.role !== USER_ROLE.ACCOUNTS) && (
                  <NavItem>
                    <NavLink tag={Link} to="/tasks">Tasks</NavLink>
                  </NavItem>
                )
              }
              {
                user && (user.access.role !== USER_ROLE.ACCOUNTS) && (
                  <NavItem>
                    <NavLink tag={Link} to="/orders">Orders</NavLink>
                  </NavItem>
                )
              }
              {
                user && (user.role === USER_ROLE.MANAGEMENT || user.access.role === USER_ROLE.GOD || user.access.role === USER_ROLE.ACCOUNTS) && (
                  <Fragment>
                    <NavItem>
                      <NavLink tag={Link} to="/reports">Reports</NavLink>
                    </NavItem>
                  </Fragment>
                )
              }
              {/* {
                user && (user.access.role === USER_ROLE.MANAGEMENT) && (
                  <Fragment>
                    <NavItem>
                      <NavLink tag={Link} to="/templates">Templates</NavLink>
                    </NavItem>
                  </Fragment>
                )
              } */}
            </Nav>
            <Nav className="ml-auto align-items-lg-center" navbar>
              <NavItem className="cursor-pointer d-none d-lg-block" onClick={toggleNotification}>
                <Icon source={Svgs.iconNotification} color="silver" className="dot dot-danger" />
                &nbsp;&nbsp;
                <Button color="navy">
                  <Icon source={Svgs.iconCheckCircleSolid} className="text-slate" />
                  <span className="ml-1 mr-3">{notificationGroups.info.counts[NOTIFICATION_TYPE.READONLY]}</span>
                  <Icon source={Svgs.iconThumbsHorizontal} className="text-slate" />
                  <span className="ml-1">{notificationGroups.info.counts[NOTIFICATION_TYPE.ACTIONABLE]}</span>
                </Button>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                {user && (
                  <Fragment>
                    <DropdownToggle nav caret className="d-flex align-items-center">
                      <ProfileItem
                        user={user}
                      />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={this.handleProfile}>
                        Profile
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.handleLogout}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Fragment>
                )}
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.common.auth ? state.common.auth.profile : null,
  notificationGroups: state.common.notificationGroups
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
