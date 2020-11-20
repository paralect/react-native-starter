import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import i18n from 'i18n';
import { validate, getServerErrors } from 'helpers/validate';
import useForm from 'hooks/useForm';

import * as userActions from 'resources/user/user.actions';

import Input from 'components/input';
import Text from 'components/text';
import MainButton from 'components/mainButton';

import images from 'themes/images';
import styles from './signInScreen.styles';

function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const passwordInput = useRef(null);

  const onSignIn = useCallback(async (values) => {
    try {
      await dispatch(userActions.signIn(values.email, values.password));
    } catch ({ data }) {
      const { errors } = data;
      const error = {
        email: getServerErrors(errors, 'email'),
        password: getServerErrors(errors, 'password'),
      };
      throw error;
    }
  }, [dispatch]);

  const validateForm = useCallback((values) => {
    const validationErrors = {
      email: validate(values.email, 'email'),
      password: validate(values.password, 'password'),
    };
    return validationErrors;
  }, []);

  const [form, onChange, onSubmit, setFocus] = useForm({}, onSignIn, validateForm);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.logoText}>React Native starter</Text>
      <Text style={styles.title}>{i18n.t('signInScreen.title')}</Text>
      <Input
        value={form.values.email}
        type="emailAddress"
        placeholder="Email"
        onChange={onChange('email')}
        error={form.errors.email && form.errors.email[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={setFocus(passwordInput)}
      />
      <Input
        getRef={passwordInput}
        value={form.values.password}
        type="password"
        placeholder="Password"
        onChange={onChange('password')}
        error={form.errors.password && form.errors.password[0]}
      />
      <MainButton
        title="Sign In"
        onPress={onSubmit}
      />
      <View style={styles.signupContainer}>
        <Text style={styles.text}>
          {i18n.t('signInScreen.noAccount')}
          &nbsp;
        </Text>
        <Text
          onPress={onSignUp}
          style={styles.link}
        >
          {i18n.t('signInScreen.signUp')}
        </Text>
      </View>
    </View>
  );
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignInScreen;
