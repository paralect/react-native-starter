import { combineReducers } from 'redux';

import { USER_LOGGED_OUT } from './user/user.constants';
import user from './user/user.reducer';

const appReducer = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGGED_OUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
