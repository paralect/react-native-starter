import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './homeScreen.styles';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
