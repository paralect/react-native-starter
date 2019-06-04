import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import styles from './homeScreen.styles';
import images from '../../themes/images';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    tabBarIcon: ({ focused }) => (
      <Image
        source={focused ? images.homeActive : images.home}
        style={styles.tabBarIcon}
        resizeMode="contain"
      />
    ),
  })

  render() {
    return (
      <View style={styles.screen}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
