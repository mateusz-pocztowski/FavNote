import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Button from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled(Button)`
  margin: 0;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ theme, activecolor }) => theme[activecolor]};
  &:hover {
    background-color: ${({ theme, activecolor }) => theme[`${activecolor}100`]};
  }
  &::before {
    content: '';
    position: absolute;
    left: 17%;
    top: 13px;
    width: 20px;
    height: 20px;
    border: 3px solid ${({ theme }) => theme.dark};
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-radius: 50%;
    opacity: ${({ disabled }) => (disabled ? '1' : '0')};
    animation: ${spin} 1s ease infinite;
  }
  ${({ centered }) =>
    centered &&
    css`
      margin: 20px auto 0;
    `}
`;

const SubmitButton = ({
  isSubmitting,
  disabled,
  centered,
  activecolor,
  children,
}) => (
  <StyledButton
    centered={centered}
    activecolor={activecolor}
    type="submit"
    disabled={isSubmitting || disabled}
  >
    {children}
  </StyledButton>
);

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
  activecolor: PropTypes.string,
  isSubmitting: PropTypes.bool.isRequired,
  centered: PropTypes.bool,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  activecolor: 'notes',
  centered: false,
  disabled: false,
};

const mapStateToProps = ({ isSubmitting }) => ({ isSubmitting });

export default connect(mapStateToProps)(SubmitButton);
