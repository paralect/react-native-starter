import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import getKeyboardType from '../../helpers/getKeyboardType';

import styles from './input.styles';

class Input extends Component {
  render() {
    const {
      type, label, onChange, blurOnSubmit, onSubmitEditing,
      value, error, returnKeyType, getRef,
    } = this.props;
    return (
      <TextInput
        ref={getRef}
        value={value}
        placeholder={label}
        textContentType={type}
        error={error}
        blurOnSubmit={blurOnSubmit}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChange}
        secureTextEntry={type === 'password'}
        keyboardType={getKeyboardType(type)}
        returnKeyType={returnKeyType}
        style={styles.input}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
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
  label: '',
  value: '',
  error: null,
  returnKeyType: 'done',
  getRef: { current: null },
  blurOnSubmit: true,
  onSubmitEditing: null,
};

export default Input;
