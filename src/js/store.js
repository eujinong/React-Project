/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { createBrowserHistory } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import {
  createStore, combineReducers, applyMiddleware
} from 'redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import Api from './apis/app';

import {
  logout
} from './actions/common';
import reducers from './reducers';

import * as Sentry from '@sentry/browser';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://9beef7095d064a799f33ed50e38f1ceb@sentry.io/1433725'
  });
}

// Add the reducer to your store on the `routing` key
export const history = createBrowserHistory();

const fetchIntercept = (fetchContext = global) => {
  const _fetch = fetchContext.fetch;

  return createStore => (reducer, initialState, enhancer) => {
    const store = createStore(reducer, initialState, enhancer);

    fetchContext.fetch = async (url, options) => {
      options.headers = {
        ...(options.headers || {}),
        ...Api.getAuthHeader()
      };
      const res = await _fetch(url, options);
      if (res.status === 400 || res.status === 401) {
        await logout()(store.dispatch);
        history.push('/login');
      }
      return res;
    };

    return store;
  };
};

const fetchInterceptor = fetchIntercept();

const historyRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(historyRouterMiddleware, thunkMiddleware);
  }
  // Enable additional logging in non-production environments.
  return applyMiddleware(historyRouterMiddleware, thunkMiddleware, createLogger());
};

export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  composeWithDevTools(
    fetchInterceptor,
    getMiddleware()
  )
);
