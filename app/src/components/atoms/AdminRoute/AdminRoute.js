import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function AdminRoute({ user, component: Component, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => {
        if (user) {
          if (user?.role === 2) {
            return <Component />;
          } else {
            return <Redirect to='/' />;
          }
        }
        return <Redirect to='/login' />;
      }}
    />
  );
}
AdminRoute.propTypes = {
  user: PropTypes.shape(),
  component: PropTypes.func.isRequired,
};

AdminRoute.defaultProps = {
  user: null,
};

export default AdminRoute;
