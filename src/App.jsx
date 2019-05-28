import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Config from 'react-native-config';
import i18n from './i18n';

import configureStore from './resources/store';

const { store } = configureStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>{i18n.t('example')}</Text>
          <Text>
            The app is in&nbsp;
            {Config.MODE}
            &nbsp;mode!
          </Text>
        </View>
      </Provider>
    );
  }
}
