import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';
import LogIn from '../pages/LogIn';
import Import from '../pages/Import';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LogIn} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/import" component={Import} isPrivate />
  </Switch>
);

export default Routes;
