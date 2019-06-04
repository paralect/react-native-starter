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
      />
    ),
  })

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>Home Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
