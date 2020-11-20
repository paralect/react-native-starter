import React, { useEffect, useState, memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import PropTypes from 'prop-types';

import Text from 'components/text';

import i18n from 'i18n';
import styles from './connectionError.styles';

function ConnectionError({ isClosable }) {
  const [errorText, setErrorText] = useState(null);
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isConnected) {
      setErrorText(null);
    } else {
      setErrorText(i18n.t('no connection'));
    }
  }, [netInfo]);

  if (!errorText) {
    return null;
  }

  return (
    <View style={styles.connectionErrorView}>
      <Text style={styles.connectionErrorText}>
        {errorText}
      </Text>
      {isClosable && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setErrorText(null)}
        >
          <Text style={styles.closeButtonText}>
            ×
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

ConnectionError.propTypes = {
  isClosable: PropTypes.bool,
};

ConnectionError.defaultProps = {
  isClosable: true,
};

export default memo(ConnectionError);
