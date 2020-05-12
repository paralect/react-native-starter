import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import i18n from 'i18n';
import { validate, getServerErrors } from 'helpers/validate';
import useForm from 'hooks/useForm';

import * as userActions from 'resources/user/user.actions';

import Input from 'components/input';
import MainButton from 'components/mainButton';

import styles from './signUpScreen.styles';

const SignUpScreen = ({ navigation }) => {
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
        lastName : values.lastName,
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
  }, []);

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
  });

  const [form, onChange, onSubmit, setFocus] = useForm({}, onSignUp, validateForm);

  const onVerifyEmailDevPress = useCallback(() => {
    userActions.verifyEmailDev(signupToken);
  }, []);

  const onSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('signUpScreen.title')}</Text>
      <Input
        label="First name"
        value={form.values.firstName}
        type="givenName"
        onChange={onChange('firstName')}
        error={form.errors.firstName && form.errors.firstName[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={setFocus(lastNameInput)}
      />
      <Input
        getRef={lastNameInput}
        label="Last name"
        value={form.values.lastName}
        type="familyName"
        onChange={onChange('lastName')}
        error={form.errors.lastName && form.errors.lastName[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={setFocus(emailInput)}
      />
      <Input
        getRef={emailInput}
        label="Email"
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
        label="Password"
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
        label="Confirm password"
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
