import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import bulbIcon from 'assets/icons/bulb.svg';
import logoIcon from 'assets/icons/logo.svg';
import logoutIcon from 'assets/icons/logout.svg';
import penIcon from 'assets/icons/pen.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import withContext from 'hoc/withContext';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { logout as logoutUser } from 'actions';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  background-color: ${({ theme, activecolor }) => theme[activecolor]};
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  z-index: 10;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.15);
  ${({ theme }) => theme.mq.smallTablet} {
    top: 0;
    left: 0;
    width: 90px;
    height: 100%;
    flex-direction: column;
  }
  ${({ theme }) => theme.mq.tablet} {
    width: 130px;
  }
`;

const Menu = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${({ theme }) => theme.mq.smallTablet} {
    flex-direction: column;
    top: 20%;
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  margin: 2px;
  width: 55px;
  height: 55px;
  border-radius: 50%;

  ${({ theme }) => theme.mq.smallTablet} {
    margin: 5px;
    border-radius: 20px;
  }

  ${({ theme }) => theme.mq.tablet} {
    width: 67px;
    height: 67px;
  }
`;

const Logo = styled(ButtonIcon)`
  display: none;
  position: absolute;
  top: 20px;
  padding: 0;
  margin: 0;
  background-color: transparent;
  background-size: 100%;
  border-radius: 0;
  &:hover {
    background-color: transparent;
  }
  ${({ theme }) => theme.mq.smallTablet} {
    background-size: 90%;
    display: block;
  }

  ${({ theme }) => theme.mq.tablet} {
    background-size: 100%;
  }
`;

const Logout = styled(StyledButtonIcon)`
  position: absolute;
  bottom: 4px;
  left: 5px;
  background-size: 58%;
  background-color: transparent;
  ${({ theme }) => theme.mq.smallTablet} {
    left: auto;
    bottom: 20px;
  }
`;

const Sidebar = ({ theme, pageContext, logout }) => {
  return (
    <Wrapper
      activecolor={pageContext}
      animate={{ backgroundColor: theme[pageContext] }}
      transition={{ duration: 0.5 }}
    >
      <Logo as={Link} to={routes.notes} icon={logoIcon} />
      <Menu>
        <StyledButtonIcon
          size="45%"
          as={NavLink}
          to={routes.notes}
          icon={penIcon}
          activeclass="active"
        />
        <StyledButtonIcon
          size="50%"
          as={NavLink}
          to={routes.twitters}
          icon={twitterIcon}
          activeclass="active"
        />
        <StyledButtonIcon
          size="37%"
          as={NavLink}
          to={routes.articles}
          icon={bulbIcon}
          activeclass="active"
        />
      </Menu>
      <Logout onClick={logout} icon={logoutIcon} />
    </Wrapper>
  );
};

Sidebar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  logout: PropTypes.func.isRequired,
  theme: PropTypes.shape().isRequired,
};

Sidebar.defaultProps = {
  pageContext: 'notes',
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

export default connect(
  null,
  mapDispatchToProps,
)(withContext(withTheme(Sidebar)));
