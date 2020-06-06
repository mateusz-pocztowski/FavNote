import React from 'react';
import styled from 'styled-components';
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

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 130px;
  background-color: ${({ theme, activecolor }) => theme[activecolor]};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menu = styled.div`
  position: absolute;
  top: 20%;
  display: flex;
  flex-direction: column;
  & > a {
    margin: 5px 0;
  }
`;

const Logo = styled(ButtonIcon)`
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
`;

const Logout = styled(ButtonIcon)`
  position: absolute;
  bottom: 20px;
  background-size: 58%;
  background-color: transparent;
`;

const Sidebar = ({ pageContext, logout }) => (
  <Wrapper activecolor={pageContext}>
    <Logo as={Link} to="/notes" icon={logoIcon} />
    <Menu>
      <ButtonIcon
        size="45%"
        as={NavLink}
        to={routes.notes}
        icon={penIcon}
        activeclass="active"
      />
      <ButtonIcon
        size="50%"
        as={NavLink}
        to={routes.twitters}
        icon={twitterIcon}
        activeclass="active"
      />
      <ButtonIcon
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

Sidebar.propTypes = {
  pageContext: PropTypes.oneOf([
    'login',
    'register',
    'notes',
    'twitters',
    'articles',
  ]).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(withContext(Sidebar));
