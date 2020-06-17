import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import ConfirmationModal from 'components/molecules/ConfirmationModal/ConfirmationModal';
import UserCard from 'components/molecules/UserCard/UserCard';

const StyledWrapper = styled.div`
  position: relative;

  ${({ theme }) => theme.mq.smallTablet} {
    padding-left: 90px;
  }

  ${({ theme }) => theme.mq.tablet} {
    padding-left: 130px;
  }
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
