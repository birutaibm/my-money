import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Image} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';

import Logo from '../assets/Logo.png';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {backgroundColor: '#123'},
        headerTransparent: true,
        headerTitle: () => <Image source={Logo} />,
      }}
      initialRouteName="Dashboard">
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },

          headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />,
        }}
        name="Cart"
        component={Cart}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
