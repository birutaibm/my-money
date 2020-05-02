import React from 'react';

import { AuthProvider } from './Auth';

const ContextProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default ContextProvider;
