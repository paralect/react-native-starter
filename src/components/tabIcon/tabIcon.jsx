import React from 'react';
import { Image } from 'react-native';

import styles from './tabIcon.styles';

const TabIcon = ({ source }) => (
  <Image
    source={source}
    style={styles.tabIcon}
    resizeMode="contain"
  />
);

export default TabIcon;
