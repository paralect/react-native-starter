import {
  USER_AUTHENTICATED,
  USER_SIGNED_IN,
  USER_LOGGED_OUT,
} from './user.constants';

export default (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNED_IN:
      return {
        ...state,
        ...action.userInfo,
        authenticated: true,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
};
