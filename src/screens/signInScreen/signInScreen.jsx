import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import i18n from '../../i18n';
import { validate, getServerErrors } from '../../helpers/validate';
import * as userActions from '../../resources/user/user.actions';

import Input from '../../components/input';
import MainButton from '../../components/mainButton';

import styles from './signInScreen.styles';

function SignInScreen({ signIn, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const passwordInput = useRef(null);

  const onSignIn = () => {
    const valErrors = {
      email: validate(email, 'email'),
      password: validate(password, 'password'),
    };

    const containErrors = valErrors.password.length
      || valErrors.email.length;

    if (!containErrors) {
      signIn(email, password)
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

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('signInScreen.title')}</Text>
      <Input
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
      />
      <MainButton
        title="Sign In"
        onPress={onSignIn}
      />
      {/* <View style={styles.signupContainer}>
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
      </View> */}
    </View>
  );
}

SignInScreen.navigationOptions = () => ({
  header: null,
});

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signIn: userActions.signIn,
};

export default connect(
  null,
  mapDispatchToProps,
)(SignInScreen);
