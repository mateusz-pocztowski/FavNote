import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';

const StyledWrapper = styled.div`
  padding-left: 130px;
  overflow: hidden;
`;

const UserPageTemplate = ({ children }) => {
  return (
    <StyledWrapper>
      <Sidebar />
      {children}
    </StyledWrapper>
  );
};

UserPageTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default UserPageTemplate;
