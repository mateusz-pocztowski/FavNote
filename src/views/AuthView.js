import React from 'react';
import AuthTemplate from 'templates/AuthTemplate';
import PropTypes from 'prop-types';

const AuthView = ({ location: { pathname } }) => {
  const authTypes = ['login', 'register'];

  const [authType] = authTypes.filter(type => pathname.includes(type));
  return <AuthTemplate authType={authType} />;
};

AuthView.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default AuthView;
