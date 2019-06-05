import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import { StyleSheet } from 'react-native';

import ContactsScreen from '../screens/contactsScreen';
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import SignUpScreen from '../screens/signUpScreen';
import SignInScreen from '../screens/signInScreen';
import AuthLoadingScreen from '../screens/authLoadingScreen';

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
    activeTintColor: colors.darkPurple,
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

const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    path: 'signin',
  },
  SignUp: SignUpScreen,
}, {
  headerMode: 'screen',
});

const AppNavigation = createSwitchNavigator({
  AuthLoading: { screen: AuthLoadingScreen },
  Auth: {
    screen: AuthStack,
    path: '',
  },
  App,
});

export default createAppContainer(AppNavigation);
