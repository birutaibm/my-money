import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import ContextProvider from './hooks';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <ContextProvider>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </ContextProvider>
);

export default App;
