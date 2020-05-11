import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import i18n from '../../i18n';
import { validate, getServerErrors } from '../../helpers/validate';
import * as userActions from '../../resources/user/user.actions';

import Input from '../../components/input';
import MainButton from '../../components/mainButton';

import styles from './signUpScreen.styles';

function SignUpScreen({ verifyEmailDev, signUp, navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [signupToken, setSignupToken] = useState(null);
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const onSignUpButtonPress = () => {
    const valErrors = {
      firstName: validate(firstName, 'firstName'),
      lastName: validate(lastName, 'lastName'),
      email: validate(email, 'email'),
      password: validate(password, 'password'),
      confirmPassword: validate({ confirmPassword, password }, 'confirmPassword'),
    };

    const containErrors = valErrors.firstName.length
      || valErrors.lastName.length
      || valErrors.password.length
      || valErrors.confirmPassword.length
      || valErrors.email.length;

    if (!containErrors) {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };
      signUp(userData)
        .then((result) => {
          setSignupToken(result.signupToken);
          setValidationErrors({});
        })
        .catch((error) => {
          const { data } = error;
          const { errors } = data;
          setValidationErrors({
            email: getServerErrors(errors, 'email'),
            password: getServerErrors(errors, 'password'),
          });
        });
    } else {
      setValidationErrors(valErrors);
    }
  };

  const onVerifyEmailDevPress = () => {
    verifyEmailDev(signupToken);
  };

  const onSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('signUpScreen.title')}</Text>
      <Input
        label="First name"
        value={firstName}
        type="givenName"
        onChange={setFirstName}
        error={validationErrors.firstName && validationErrors.firstName[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => lastNameInput.current && lastNameInput.current.input
          && lastNameInput.current.input.focus()}
      />
      <Input
        getRef={lastNameInput}
        label="Last name"
        value={lastName}
        type="familyName"
        onChange={setLastName}
        error={validationErrors.lastName && validationErrors.lastName[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => emailInput.current && emailInput.current.input
          && emailInput.current.input.focus()}
      />
      <Input
        getRef={emailInput}
        label="Email"
        value={email}
        type="emailAddress"
        onChange={setEmail}
        error={validationErrors.email && validationErrors.email[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => passwordInput.current && passwordInput.current.input
          && passwordInput.current.input.focus()}
      />
      <Input
        getRef={passwordInput}
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        error={validationErrors.password && validationErrors.password[0]}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => confirmPasswordInput.current && confirmPasswordInput.current.input
          && confirmPasswordInput.current.input.focus()}
      />
      <Input
        getRef={confirmPasswordInput}
        label="Confirm password"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        error={validationErrors.confirmPassword && validationErrors.confirmPassword[0]}
      />
      <MainButton
        title="Sign Up"
        onPress={onSignUpButtonPress}
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

SignUpScreen.navigationOptions = {
  header: null,
};

SignUpScreen.propTypes = {
  signUp: PropTypes.func.isRequired,
  verifyEmailDev: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  signUp: userActions.signUp,
  verifyEmailDev: userActions.verifyEmailDev,
};

export default connect(
  null,
  mapDispatchToProps,
)(SignUpScreen);
