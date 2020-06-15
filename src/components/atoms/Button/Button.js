import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 0;
  background-color: ${({ theme, activecolor }) =>
    theme[activecolor] || theme.gray200};
  width: 220px;
  height: 47px;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat';
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.s};
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme, activecolor }) =>
      theme[`${activecolor}100`] || theme.gray300};
  }
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${({ theme, activecolor }) =>
        activecolor ? theme[activecolor] : theme.gray200};
      width: 105px;
      height: 30px;
      font-size: ${({ theme }) => theme.fontSize.xxs};
      &:hover {
        background-color: ${({ theme, activecolor }) =>
          activecolor ? theme[`${activecolor}100`] : theme.gray300};
      }
    `}
`;

export default Button;
