import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import getKeyboardType from '../../helpers/getKeyboardType';
import colors from '../../themes/colors';

class Input extends Component {
  render() {
    const {
      type, label, onChange, blurOnSubmit, onSubmitEditing,
      value, error, returnKeyType, getRef,
    } = this.props;
    return (
      <TextField
        label={label}
        ref={getRef}
        value={value}
        type={type}
        error={error}
        blurOnSubmit={blurOnSubmit}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChange}
        secureTextEntry={type === 'password'}
        keyboardType={getKeyboardType(type)}
        returnKeyType={returnKeyType}
        tintColor={colors.darkPurple}
        baseColor={colors.font}
        textColor={colors.font}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  returnKeyType: PropTypes.string,
  getRef: PropTypes.shape({ current: PropTypes.instanceOf(TextField) }),
  blurOnSubmit: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  error: null,
  returnKeyType: 'done',
  getRef: { current: null },
  blurOnSubmit: true,
  onSubmitEditing: null,
};

export default Input;
