import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { getItem } from '../../helpers/storage';
import config from '../../resources/config';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrap();
  }

  _bootstrap = async () => {
    const { navigation } = this.props;
    const token = await getItem('token');
    config.token = token;
    navigation.navigate(token ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthLoadingScreen;
