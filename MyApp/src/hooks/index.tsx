import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { CartProvider } from './cart';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

export default AppProvider;
