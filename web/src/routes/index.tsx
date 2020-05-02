import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import LogIn from '../pages/LogIn';
import Import from '../pages/Import';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LogIn} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/import" component={Import} />
  </Switch>
);

export default Routes;
