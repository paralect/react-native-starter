import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from 'screens/splashScreen';
import HomeScreen from 'screens/homeScreen';
import ContactsScreen from 'screens/contactsScreen';
import ProfileScreen from 'screens/profileScreen';
import SignInScreen from 'screens/signInScreen';
import SignUpScreen from 'screens/signUpScreen';

import TabIcon from 'components/tabIcon';

import { USER_AUTHENTICATED } from 'resources/user/user.constants';
import * as userSelectors from 'resources/user/user.selectors';

import { getItem } from 'helpers/storage';
import config from 'resources/config';

import colors from 'themes/colors';
import images from 'themes/images';

const prefix = `${config.applicationId}://`;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarOptions = {
  keyboardHidesTabBar: true,
  labelStyle: {
    fontSize: 13,
  },
  activeTintColor: colors.darkPurple,
  style: {
    paddingVertical: 5,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
};

const AppNavigation = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userAuthenticated = useSelector(userSelectors.getUserAuthenticated);

  const getToken = useCallback(async () => {
    const token = await getItem('token');
    config.token = token;
    setIsLoading(false);
    if (token) {
      dispatch({ type: USER_AUTHENTICATED });
    }
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  if (isLoading) {
    return (
      <SplashScreen />
    );
  }

  return (
    <NavigationContainer linking={{ prefixes: [prefix] }}>
      {userAuthenticated
        ? (
          <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused }) => <TabIcon source={focused ? images.homeActive : images.home} />
              }}
            />
            <Tab.Screen
              name="Contacts"
              component={ContactsScreen}
              options={{
                tabBarIcon: ({ focused }) => <TabIcon source={focused ? images.contactActive : images.contact} />
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ focused }) => <TabIcon source={focused ? images.profileActive : images.profile} />
              }}
            />
          </Tab.Navigator>
        )
        : (
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        )
      }
    </NavigationContainer>
  );
};

export default AppNavigation;
