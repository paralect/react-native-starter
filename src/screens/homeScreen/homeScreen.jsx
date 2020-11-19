import React from 'react';
import { View } from 'react-native';

import Text from 'components/text';

import styles from './homeScreen.styles';

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;
