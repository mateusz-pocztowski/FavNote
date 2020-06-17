import React from 'react';
import styled from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import defaultUserImg from 'assets/images/defaultUser.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px 20px 10px 30px;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.gray200};
  border-radius: 0 0 0 14px;
  ${({ theme }) => theme.mq.tablet} {
    display: flex;
  }
`;

const Avatar = styled.div`
  display: block;
  width: 35px;
  height: 35px;
  background: url(${({ img }) => img}) no-repeat;
  background-color: white;
  background-position: center;
  background-size: 100%;
  border-radius: 50%;
  margin-left: 15px;
`;

const UserCard = ({ userName }) => (
  <Wrapper>
    <Paragraph>{userName}</Paragraph>
    <Avatar img={defaultUserImg} />
  </Wrapper>
);

UserCard.propTypes = {
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = ({ userName }) => ({ userName });

export default connect(mapStateToProps)(UserCard);
