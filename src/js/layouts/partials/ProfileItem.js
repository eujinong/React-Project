import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import Avatar from '../../components/Avatars/Avatar';

class ProfileItem extends Component {
  render() {
    const {
      user, className, ...otherProps
    } = this.props;

    if (!user) {
      return null;
    }

    const classNameMap = {
      'profile-item': true
    };

    if (className) {
      classNameMap[className] = true;
    }
    return (
      <div className={classnames(classNameMap)} {...otherProps}>
        <Avatar
          user={user}
        />
        <div className="content">
          <div className="title">
            {user.name}
          </div>
          <div className="subtitle">
            {user.company}
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.defaultProps = {
  user: {}
};

export default ProfileItem;
