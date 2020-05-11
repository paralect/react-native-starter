import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import images from 'themes/images';

import * as userActions from '../../resources/user/user.actions';
import MainButton from '../../components/mainButton';

import styles from './profileScreen.styles';

class ProfileScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      title: 'Profile',
      tabBarIcon: ({ focused }) => (
        <Image
          source={focused ? images.profileActive : images.profile}
          style={styles.tabBarIcon}
          resizeMode="contain"
        />
      ),
    });
  }

  onSignOutPress = () => {
    const { signOut } = this.props;
    signOut();
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>Profile Screen</Text>
        <MainButton
          title="Sign out"
          onPress={this.onSignOutPress}
        />
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  signOut: userActions.signOut,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
