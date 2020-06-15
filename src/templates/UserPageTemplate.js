import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import ConfirmationModal from 'components/molecules/ConfirmationModal/ConfirmationModal';
import UserCard from 'components/molecules/UserCard/UserCard';

const StyledWrapper = styled.div`
  position: relative;
  padding-left: 130px;
  overflow: hidden;
`;

const UserPageTemplate = ({ children }) => {
  return (
    <StyledWrapper>
      <UserCard />
      <Sidebar />
      <ConfirmationModal />
      {children}
    </StyledWrapper>
  );
};

UserPageTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default UserPageTemplate;
