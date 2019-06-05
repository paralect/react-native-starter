import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './mainButton.styles';

class MainButton extends Component {
  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

MainButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

MainButton.defaultProps = {
};

export default MainButton;
