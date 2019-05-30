import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './homeScreen.styles.js';

import TabBar from '../../components/tabBar';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>Home Screen</Text>
        <TabBar />
      </View>
    );
  }
}

export default HomeScreen;
