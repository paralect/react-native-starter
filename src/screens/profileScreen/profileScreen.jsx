import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './profileScreen.styles';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
