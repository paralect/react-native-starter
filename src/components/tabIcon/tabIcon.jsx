import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import styles from './tabIcon.styles';

function TabIcon({ source }) {
  return (
    <Image
      source={source}
      style={styles.tabIcon}
      resizeMode="contain"
    />
  );
}

TabIcon.propTypes = {
  source: PropTypes.number.isRequired,
};

export default TabIcon;
