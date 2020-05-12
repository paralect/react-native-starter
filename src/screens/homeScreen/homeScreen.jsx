import React from 'react';
import { View, Text } from 'react-native';

import styles from './homeScreen.styles';

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;
