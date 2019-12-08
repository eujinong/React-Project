import Types from './types';
import Api from '../apis/app';

export const login = auth => (
  (dispatch) => {
    Api.setAuth(auth);
    return dispatch({
      type: Types.LOGIN,
      auth
    });
  }
);

export const logout = () => (
  (dispatch) => {
    Api.setAuth(null);
    return dispatch({
      type: Types.LOGOUT
    });
  }
);

export const setUsers = users => (
  dispatch => dispatch({
    type: Types.SET_USERS,
    users
  })
);

export const setNotifications = notifications => (
  dispatch => dispatch({
    type: Types.SET_NOTIFICATIONS,
    notifications
  })
);

export const setReport = report => (
  dispatch => dispatch({
    type: Types.SET_REPORT,
    report
  })
);

export const removeNotification = (notificationGroup, notification) => (
  dispatch => dispatch({
    type: Types.REMOVE_NOTIFICATION,
    notification,
    notificationGroup
  })
);

export const removeNotificationGroup = notificationGroup => (
  dispatch => dispatch({
    type: Types.REMOVE_NOTIFICATION_GROUP,
    notificationGroup
  })
);

export const addNotification = notification => (
  dispatch => dispatch({
    type: Types.ADD_NOTIFICATION,
    notification
  })
);
