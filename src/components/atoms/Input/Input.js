import styled, { css } from 'styled-components';
import searchIcon from 'assets/icons/magnifier.svg';

const Input = styled.input`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  font-family: 'Montserrat', sans-serif;
  transition: 0.2s;
  border-bottom: 1px solid ${({ theme }) => theme.gray100};
  &:focus {
    border-color: rgb(61, 61, 61);
  }
  ${({ icon }) =>
    icon &&
    css`
      background-image: url(${icon});
      background-size: 15px;
      background-position: 8px 50%;
      background-repeat: no-repeat;
      padding: 15px 25px 15px 35px;
    `}
  ${({ icon }) =>
    icon === 'search' &&
    css`
      background-position: 15px 50%;
      background-image: url(${searchIcon});
      padding: 10px 20px 10px 40px;
      font-size: ${({ theme }) => theme.fontSize.xs};
      border-radius: 50px;
      border: 1px solid #ddd;
      background-color: ${({ theme }) => theme.gray100};
    `}
`;

export default Input;
