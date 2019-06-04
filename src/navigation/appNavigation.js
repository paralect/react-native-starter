import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import { StyleSheet } from 'react-native';

import ContactsScreen from 'screens/contactsScreen';
import HomeScreen from 'screens/homeScreen';
import ProfileScreen from 'screens/profileScreen';

import metrics from 'themes/metrics';
import colors from 'themes/colors';

const Tabs = createBottomTabNavigator({
  HomeTab: HomeScreen,
  ContactsTab: ContactsScreen,
  ProfileTab: ProfileScreen,
}, {
  initialRouteName: 'HomeTab',
  tabBarOptions: {
    labelStyle: {
      fontSize: 13,
    },
    activeTintColor: colors.activeFont,
    style: {
      paddingVertical: 5,
      height: metrics.tabBarHeight,
      borderTopColor: colors.border,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
  },
  lazy: true,
});

const App = createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: { header: null },
  },
}, {
  headerMode: 'screen',
});

export default createAppContainer(App);
