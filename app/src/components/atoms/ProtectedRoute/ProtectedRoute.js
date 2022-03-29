import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ user, component: Component, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => {
        if (user) {
          return <Component />;
        }
        return <Redirect to='/login' />;
      }}
    />
  );
}
ProtectedRoute.propTypes = {
  user: PropTypes.shape(),
  component: PropTypes.func.isRequired,
};

ProtectedRoute.defaultProps = {
  user: null,
};

export default ProtectedRoute;
