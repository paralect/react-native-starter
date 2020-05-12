import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';

import * as userActions from 'resources/user/user.actions';
import MainButton from 'components/mainButton';

import styles from './profileScreen.styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const onSignOutPress = useCallback(() => {
    dispatch(userActions.signOut());
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Profile Screen</Text>
      <MainButton
        title="Sign out"
        onPress={onSignOutPress}
      />
    </View>
  );
};

export default ProfileScreen;
