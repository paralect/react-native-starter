import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Text from 'components/text';

import styles from './mainButton.styles';

function MainButton({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

MainButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default MainButton;
