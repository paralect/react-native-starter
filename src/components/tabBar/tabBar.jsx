import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import images from '../../themes/images';
import styles from './tabBar.styles';

class TabBar extends Component {
  static navigationOptions = {
    header: null,
  };

  onTabPress = (tab) => {
    const { navigation } = this.props;
    const { index } = navigation.state;
    const activeTab = navigation.state.routes[index].key;
    if (activeTab === tab) {
      navigation.popToTop();
    } else {
      navigation.navigate(tab);
    }
  }

  render() {
    const { navigation } = this.props;
    const { index } = navigation.state;
    const activeTab = navigation.state.routes[index].key;
    return (
      <View style={styles.tabBarContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => this.onTabPress('HomeTab')}>
          <Image
            style={styles.tabIcon}
            source={activeTab === 'HomeTab' ? images.homeActive : images.home}
            resizeMode="contain"
          />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => this.onTabPress('ContactsTab')}>
          <Image
            style={styles.tabIcon}
            source={activeTab === 'ContactsTab' ? images.contactActive : images.contact}
            resizeMode="contain"
          />
          <Text style={styles.tabText}>Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => this.onTabPress('ProfileTab')}>
          <Image
            style={styles.tabIcon}
            source={activeTab === 'ProfileTab' ? images.profileActive : images.profile}
            resizeMode="contain"
          />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

TabBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabBar;
