import { combineReducers } from 'redux';

import { USER_LOGOUT } from './user/user.constants';
import user from './user/user.reducer';

const appReducer = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
