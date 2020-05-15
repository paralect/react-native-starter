import { Alert } from 'react-native';
import config from 'resources/config';

import ApiError from 'helpers/api/api.error';
import { setItem, removeItem } from 'helpers/storage';

import {
  USER_SIGNED_IN,
  USER_LOGGED_OUT,
} from './user.constants';

import * as api from './user.api';

export const signUp = userData => async () => {
  try {
    const payload = await api.signUp(userData);
    return payload;
  } catch (error) {
    if (error.status === 400) {
      throw new ApiError(error.data, error.status);
    } else {
      Alert.alert(
        'SignUp Failed',
        'Sorry, something went wrong.',
        [{ text: 'OK', style: 'cancel' }],
      );
      throw new ApiError({ errors: [] }, error.status);
    }
  }
};

export const signIn = (email, password) => async (dispatch) => {
  try {
    const userInfo = await api.signIn(email, password);
    config.token = userInfo.accessToken;
    await setItem('token', userInfo.accessToken);
    dispatch({ type: USER_SIGNED_IN, userInfo });
  } catch (error) {
    if (error.status === 400) {
      throw new ApiError(error.data, error.status);
    } else {
      Alert.alert(
        'SignIn Failed',
        'Sorry, something went wrong.',
        [{ text: 'OK', style: 'cancel' }],
      );
      throw new ApiError({ errors: [] }, error.status);
    }
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await api.signOut();
    config.token = null;
    await removeItem('token');
    dispatch({ type: USER_LOGGED_OUT });
  } catch (error) {
    Alert.alert(
      'SignOut Failed',
      'Sorry, something went wrong.',
      [{ text: 'OK', style: 'cancel' }],
    );
  }
};

export const verifyEmailDev = _signupToken => async () => {
  await api.verifyEmailDev(_signupToken);
};
