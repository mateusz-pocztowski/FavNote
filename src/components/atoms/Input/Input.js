import styled, { css } from 'styled-components';
import searchIcon from 'assets/icons/magnifier.svg';

const Input = styled.input`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.gray100};
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #ddd;
  border-radius: 50px;
  transition: 0.2s;
  &:focus {
    border-color: ${({ theme, activecolor }) =>
      theme[activecolor] || theme.notes};
  }
  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ${({ search }) =>
    search &&
    css`
      padding: 10px 20px 10px 40px;
      font-size: ${({ theme }) => theme.fontSize.xs};
      background-image: url(${searchIcon});
      background-size: 15px;
      background-position: 15px 50%;
      background-repeat: no-repeat;
    `}
`;

export default Input;
