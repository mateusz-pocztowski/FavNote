import React from 'react';
import PropTypes from 'prop-types';

const NotFoundView = () => <div />;

NotFoundView.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotFoundView;
