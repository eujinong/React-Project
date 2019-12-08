import React, { Component } from 'react';
import classnames from 'classnames';

class Avatar extends Component {
  get avatarName() {
    const {
      name, symbol
    } = this.props.user;

    if (symbol) {
      return symbol;
    }
    if (!name) {
      return '';
    }

    const namesSplit = name.split(' ');
    if (namesSplit.length >= 2) {
      return namesSplit[0].charAt(0) + namesSplit[1].charAt(0);
    }
    return namesSplit[0].charAt(0);
  }

  render() {
    const {
      user, className, onClick, ...otherProps
    } = this.props;

    const classNameMap = {
      avatar: true
    };

    if (className) {
      classNameMap[className] = true;
    }
    return (
      <div className={classnames(classNameMap)} {...otherProps}>
        {user.photo ? (
          <div
            className="avatar-img"
            style={{
              background: `url('${user.photo}')`
            }}
          />
        ) : (
          <div className="avatar-text">
            <span>{this.avatarName}</span>
          </div>
        )}
        <div className="avatar-name">
          {user.name}
        </div>
      </div>
    );
  }
}

Avatar.defaultProps = {
  user: {},
  onClick: () => {}
};

export default Avatar;
