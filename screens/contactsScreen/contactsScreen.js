import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './contactsScreen.styles';

import TabBar from '../../components/tabBar';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>Contacts Screen</Text>
        <TabBar />
      </View>
    );
  }
}

export default HomeScreen;
