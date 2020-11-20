import PropTypes from 'prop-types';
import React from 'react';
import { TextInput, View } from 'react-native';
import getKeyboardType from 'helpers/getKeyboardType';

import Text from 'components/text';

import styles from './input.styles';

function Input({
  type,
  label,
  onChange,
  placeholder,
  blurOnSubmit,
  onSubmitEditing,
  value,
  error,
  returnKeyType,
  getRef,
}) {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={getRef}
        value={value}
        placeholder={placeholder}
        textContentType={type}
        blurOnSubmit={blurOnSubmit}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChange}
        secureTextEntry={type === 'password'}
        keyboardType={getKeyboardType(type)}
        returnKeyType={returnKeyType}
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  returnKeyType: PropTypes.string,
  getRef: PropTypes.shape(),
  blurOnSubmit: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
};

Input.defaultProps = {
  type: 'none',
  label: null,
  value: '',
  placeholder: '',
  error: null,
  returnKeyType: 'done',
  getRef: { current: null },
  blurOnSubmit: true,
  onSubmitEditing: null,
};

export default Input;
