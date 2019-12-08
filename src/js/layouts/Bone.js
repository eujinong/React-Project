import React, { Component } from 'react';

class Bone extends Component {
  render() {
    return (
      <div className="site">
        <div className="site-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Bone;
