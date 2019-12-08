import React, { Component, Fragment } from 'react';
import Avatar from './Avatar';

class AvatarGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleUsers: [],
      invisibleUsers: 0
    };
  }

  componentWillMount() {
    this.configProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.configProps(props);
  }


  configProps(props) {
    const {
      users, verifiers, maxVisible, userCount
    } = props;
    let visibleUsers = [];
    let invisibleUsers = [];

    if (users != null && verifiers != null) {
      if (userCount > maxVisible) {
        visibleUsers = [...users, ...verifiers].slice(0, maxVisible);
        invisibleUsers = Math.max(userCount - maxVisible, 0);
      } else {
        visibleUsers = [...users, ...verifiers];
      }
    }

    let {extraAvatars} = props;
    extraAvatars = extraAvatars || null;

    this.setState({
      visibleUsers,
      invisibleUsers,
      extraAvatars,
    });
  }

  render() {
    const {
      visibleUsers,
      invisibleUsers,
      extraAvatars
    } = this.state;
    return (
      <div className="avatar-group">
        <Fragment>
          { extraAvatars }
          {
            invisibleUsers.length !== 0 && (
              <Avatar
                className="avatar-secondary"
                user={{
                  symbol: `+${invisibleUsers}`
                }}
              />
            )
          }
          {
            visibleUsers.reverse().map((item, index) => (
              <Avatar
                key={`${index}`}
                user={item}
              />
            ))
          }
        </Fragment>
      </div>
    );
  }
}

AvatarGroup.defaultProps = {
  maxVisible: 6,
  users: [],
  verifiers: [],
  extraAvatars: null,
};

export default AvatarGroup;
