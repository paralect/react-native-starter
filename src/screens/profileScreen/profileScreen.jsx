import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import styles from './profileScreen.styles';
import images from '../../themes/images';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    tabBarIcon: ({ focused }) => (
      <Image
        source={focused ? images.profileActive : images.profile}
        style={styles.tabBarIcon}
        resizeMode="contain"
      />
    ),
  })

  render() {
    return (
      <View style={styles.screen}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
