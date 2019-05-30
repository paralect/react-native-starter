import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './contactsScreen.styles';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text>Contacts Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
