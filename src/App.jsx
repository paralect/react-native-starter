import React from 'react';
import { Provider } from 'react-redux';

import AppNavigation from './navigation';
import ConnectionError from './components/connectionError';

import configureStore from './resources/store';

const { store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
      <ConnectionError />
    </Provider>
  );
}

export default App;
