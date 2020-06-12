/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, token, isLoading, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !token && !isLoading ? (
        <Redirect to={routes.login} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.func,
  ]).isRequired,
  token: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

PrivateRoute.defaultProps = {
  token: null,
};

const mapStateToProps = ({ userJWT, isLoading }) => ({
  token: userJWT,
  isLoading,
});

export default connect(mapStateToProps)(PrivateRoute);
