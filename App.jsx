import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config'
import i18n from './src/i18n';

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
      <View style={styles.container}>
        <Text>{i18n.t('example')}</Text>
        <Text>The app is in {Config.MODE} mode!</Text>
      </View>
    );
  }
}
