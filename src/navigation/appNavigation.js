import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

import TabBar from '../components/tabBar';
import ContactsScreen from '../screens/contactsScreen';
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';

const Tabs = createBottomTabNavigator({
  HomeTab: HomeScreen,
  ContactsTab: ContactsScreen,
  ProfileTab: ProfileScreen,
}, {
  initialRouteName: 'HomeTab',
  tabBarComponent: TabBar,
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
