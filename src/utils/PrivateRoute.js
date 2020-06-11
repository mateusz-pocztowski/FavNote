/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token ? <Component {...props} /> : <Redirect to={routes.login} />
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.func,
  ]).isRequired,
  token: PropTypes.string,
};

PrivateRoute.defaultProps = {
  token: null,
};

const mapStateToProps = ({ userJWT }) => ({
  token: userJWT,
});

export default connect(mapStateToProps)(PrivateRoute);
