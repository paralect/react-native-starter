import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import images from 'themes/images';
import styles from './contactsScreen.styles';

class ContactsScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      title: 'Contacts',
      tabBarIcon: ({ focused }) => (
        <Image
          source={focused ? images.contactActive : images.contact}
          style={styles.tabBarIcon}
          resizeMode="contain"
        />
      ),
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>Contacts Screen</Text>
      </View>
    );
  }
}

export default ContactsScreen;
