import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import images from 'themes/images';
import styles from './profileScreen.styles';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    tabBarIcon: ({ focused }) => (
      <Image
        source={focused ? images.profileActive : images.profile}
      />
    ),
  })

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>Profile Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
