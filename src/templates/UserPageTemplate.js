import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';

const StyledWrapper = styled.div`
  padding-left: 130px;
  overflow: hidden;
`;

const UserPageTemplate = ({ children, userID }) => {
  if (!userID) return <Redirect to={routes.login} />;
  return (
    <StyledWrapper>
      <Sidebar />
      {children}
    </StyledWrapper>
  );
};

UserPageTemplate.propTypes = {
  userID: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

UserPageTemplate.defaultProps = {
  userID: null,
};

const mapStateToProps = ({ userID }) => ({ userID });

export default connect(mapStateToProps)(UserPageTemplate);
