import React from 'react';
import { Provider } from 'react-redux';

import AppNavigation from './navigation/appNavigation';
import ConnectionError from './components/connectionError';

import configureStore from './resources/store';

const { store } = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
        <ConnectionError />
      </Provider>
    );
  }
}
