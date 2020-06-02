import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Image} from 'react-native';

import Login from '../pages/Login';

import Logo from '../assets/Logo.png';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {backgroundColor: '#123'},
        headerTransparent: true,
        headerTitle: () => <Image source={Logo} />,
      }}
      initialRouteName="Login">
      <Auth.Screen name="Login" component={Login} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
