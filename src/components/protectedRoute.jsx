import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const ProtectedRoute = ({ redirect_path, admin_required, component: Component, ...rest }) => {
  const user = getCurrentUser();
  const test_user = !!admin_required ? user.admin : user;
  if (!!admin_required && !test_user) {
    alert("Access Denied, Admin Only");
  }

  return (
    <Route
      { ...rest }
      render={ props => test_user ?
        <Component { ...props } /> :
        <Redirect to={{
          pathname: redirect_path,
          state: { from: props.location }}}
        />
      }
    />
  );
};

export default ProtectedRoute
