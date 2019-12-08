import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="site-footer py-3">
        <Container>
          Timmicom.net
        </Container>
      </div>
    );
  }
}

export default Footer;
