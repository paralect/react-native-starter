import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';

import * as userActions from 'resources/user/user.actions';
import MainButton from 'components/mainButton';
import Text from 'components/text';

import styles from './profileScreen.styles';

function ProfileScreen() {
  const dispatch = useDispatch();

  const onSignOutPress = useCallback(() => {
    dispatch(userActions.signOut());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Profile Screen</Text>
      <MainButton
        title="Sign out"
        onPress={onSignOutPress}
      />
    </View>
  );
}

export default ProfileScreen;
