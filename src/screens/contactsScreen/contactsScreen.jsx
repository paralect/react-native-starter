import React from 'react';
import { View } from 'react-native';

import Text from 'components/text';

import styles from './contactsScreen.styles';

function ContactsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Contacts Screen</Text>
    </View>
  );
}

export default ContactsScreen;
