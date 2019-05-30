/* global __DEV__ */

import {
  createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default () => {
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return {
    store,
  };
};
