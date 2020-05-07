import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

interface Props extends RouteProps {
  isPrivate?: boolean;
}

const MyRoute: React.FC<Props> = ({ isPrivate = false, ...rest }) => {
  const { user } = useAuth();
  if (isPrivate === !!user) {
    return <Route {...rest} />;
  }
  if (isPrivate) {
    return <Redirect exact to="/" />;
  }
  // user is logged and this route is not private
  return <Redirect exact to="/dashboard" />;
};

export default MyRoute;
