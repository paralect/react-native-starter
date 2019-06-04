import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import styles from './contactsScreen.styles';
import images from '../../themes/images';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Contacts',
    tabBarIcon: ({ focused }) => (
      <Image
        source={focused ? images.contactActive : images.contact}
        style={styles.tabBarIcon}
        resizeMode="contain"
      />
    ),
  })

  render() {
    return (
      <View style={styles.screen}>
        <Text>Contacts Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
