import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Echo from 'laravel-echo';

import App from './js/App';
import { store } from './js/store';

window.io = require('socket.io-client');

window.EchoConstructor = Echo;

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
