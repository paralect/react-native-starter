import PropTypes from 'prop-types';
import { View } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import i18n from 'i18n';
import { validate, getServerErrors } from 'helpers/validate';
import useForm from 'hooks/useForm';

import * as userActions from 'resources/user/user.actions';

import Input from 'components/input';
import Text from 'components/text';
import MainButton from 'components/mainButton';

import styles from './signUpScreen.styles';

function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const [signupToken, setSignupToken] = useState(null);
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const onSignUp = useCallback(async (values) => {
    try {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      const result = await dispatch(userActions.signUp(userData));
      setSignupToken(result.signupToken);
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
      firstName: validate(values.firstName, 'firstName'),
      lastName: validate(values.lastName, 'lastName'),
      email: validate(values.email, 'email'),
      password: validate(values.password, 'password'),
      confirmPassword: validate({
        confirmPassword: values.confirmPassword,
        password: values.password,
      }, 'confirmPassword'),
    };
    return validationErrors;
  }, []);

  const [form, onChange, onSubmit, setFocus] = useForm({}, onSignUp, validateForm);

  const onVerifyEmailDevPress = useCallback(() => {
    userActions.verifyEmailDev(signupToken);
  }, [signupToken]);

  const onSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('signUpScreen.title')}</Text>
      <Input
        value={form.values.firstName}
        type="givenName"
        placeholder="First name"
        onChange={onChange('firstName')}
        error={form.errors.firstName && form.errors.firstName[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={setFocus(lastNameInput)}
      />
      <Input
        getRef={lastNameInput}
        value={form.values.lastName}
        type="familyName"
        placeholder="Last name"
        onChange={onChange('lastName')}
        error={form.errors.lastName && form.errors.lastName[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={setFocus(emailInput)}
      />
      <Input
        getRef={emailInput}
        placeholder="Email"
        value={form.values.email}
        type="emailAddress"
        onChange={onChange('email')}
        error={form.errors.email && form.errors.email[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={setFocus(passwordInput)}
      />
      <Input
        getRef={passwordInput}
        placeholder="Password"
        type="password"
        value={form.values.password}
        onChange={onChange('password')}
        error={form.errors.password && form.errors.password[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={setFocus(confirmPasswordInput)}
      />
      <Input
        getRef={confirmPasswordInput}
        placeholder="Confirm password"
        type="password"
        value={form.values.confirmPassword}
        onChange={onChange('confirmPassword')}
        error={form.errors.confirmPassword && form.errors.confirmPassword[0]}
      />
      <MainButton
        title="Sign Up"
        onPress={onSubmit}
      />
      <View style={styles.signinContainer}>
        <Text>
          {i18n.t('signUpScreen.haveAccount')}
          &nbsp;
        </Text>
        <Text
          onPress={onSignIn}
          style={styles.link}
        >
          {i18n.t('signUpScreen.signIn')}
        </Text>
      </View>
      {signupToken
        && <Text onPress={onVerifyEmailDevPress}>Verify email (dev)</Text>
      }
    </View>
  );
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUpScreen;
