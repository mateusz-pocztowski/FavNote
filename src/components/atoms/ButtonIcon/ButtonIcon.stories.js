import React from 'react';
import bulbIcon from 'assets/icons/bulb.svg';
import logoutIcon from 'assets/icons/logout.svg';
import plusIcon from 'assets/icons/plus.svg';
import penIcon from 'assets/icons/pen.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';

const YellowBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background: ${({ theme }) => theme.note};
`;

export default {
  title: 'Atoms/ButtonIcon',
  decorators: [story => <YellowBackground>{story()}</YellowBackground>],
};

export const Bulb = () => <ButtonIcon active icon={bulbIcon} />;
export const Logout = () => <ButtonIcon icon={logoutIcon} />;
export const Plus = () => <ButtonIcon icon={plusIcon} />;
export const Pen = () => <ButtonIcon icon={penIcon} />;
export const Twitter = () => <ButtonIcon icon={twitterIcon} />;
