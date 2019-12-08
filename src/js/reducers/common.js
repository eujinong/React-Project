import Types from '../actions/types';
import { NOTIFICATION_TYPE } from '../configs/enums';
import NotificationsHelper from '../helpers/NotificationsHelper';

export const initialState = {
  auth: null,
  users: [],
  notifications: [],
  notificationGroups: {
    info: {
      counts: {
        [NOTIFICATION_TYPE.ACTIONABLE]: 0,
        [NOTIFICATION_TYPE.READONLY]: 0
      }
    },
    groups: []
  }
};

const login = (state, action) => ({
  ...state,
  auth: action.auth
});

const logout = state => ({
  ...state,
  auth: null
});

const setUsers = (state, action) => ({
  ...state,
  users: action.users
});

const setNotifications = (state, action) => ({
  ...state,
  notifications: action.notifications,
  notificationGroups: NotificationsHelper.getNotificationGroups(action.notifications)
});

const removeNotificationGroup = (state, action) => {
  const notificationGroups = NotificationsHelper.removeNotificationGroup(state.notificationGroups, action.notificationGroup);
  return {
    ...state,
    notificationGroups
  };
};

const removeNotification = (state, action) => {
  const notificationGroups = NotificationsHelper.removeNotification(state.notificationGroups, action.notificationGroup, action.notification);
  return {
    ...state,
    notificationGroups
  };
};

const addNotification = (state, action) => {
  const notificationGroups = NotificationsHelper.addNotification(state.notificationGroups, action.notification);
  return {
    ...state,
    notificationGroups
  };
};

const setReport = (state, action) => ({
  ...state,
  report: action.report
});

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return login(state, action);
    case Types.LOGOUT:
      return logout(state, action);
    case Types.SET_USERS:
      return setUsers(state, action);
    case Types.SET_NOTIFICATIONS:
      return setNotifications(state, action);
    case Types.SET_REPORT:
      return setReport(state, action);
    case Types.REMOVE_NOTIFICATION_GROUP:
      return removeNotificationGroup(state, action);
    case Types.REMOVE_NOTIFICATION:
      return removeNotification(state, action);
    case Types.ADD_NOTIFICATION:
      return addNotification(state, action);
    default:
      return state;
  }
};
