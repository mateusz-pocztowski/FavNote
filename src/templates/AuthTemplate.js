/* eslint-disable consistent-return */
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Formik, Form } from 'formik';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import SubmitButton from 'components/molecules/SubmitButton/SubmitButton';
import bgImage from 'assets/images/background.jpg';
import Heading from 'components/atoms/Heading/Heading';
import headerIcon from 'assets/icons/idea.svg';
import withContext from 'hoc/withContext';
import BulbIcon from 'assets/icons/bulb.svg';
import penIcon from 'assets/icons/pen.svg';
import emailIcon from 'assets/icons/mail.svg';
import userIcon from 'assets/icons/user.svg';
import passwordIcon from 'assets/icons/password.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import { Link, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticate as authenticateAction } from 'actions';

const StyledWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffe470;
  overflow: hidden;
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    clip-path: polygon(0 73%, 0 8%, 100% 100%, 28% 100%);
    background-color: rgba(255, 232, 128, 0.6);
  }
`;

const StyledContentWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1150px;
  height: 630px;
  padding: 50px 50px 50px 65px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.3);
  border-radius: 10px;
  background-color: #ffffff;
  background: url(${bgImage}) no-repeat;
  background-size: cover;
`;

const StyledForm = styled.div`
  flex-basis: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 30px 50px;
  background-color: #ffffff;
  box-shadow: 0 0 30px -10px hsla(0, 0%, 0%, 0.3);
  border-radius: 10px;
`;

const Header = styled.div`
  flex-basis: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderImage = styled.div`
  width: 350px;
  height: 350px;
  background: url(${headerIcon}) no-repeat center;
  background-size: 100%;
`;

const HeaderText = styled(Heading)`
  margin: 0;
  font-weight: ${({ theme }) => theme.regular};
  font-size: ${({ theme }) => theme.fontSize.lm};
`;

const IconsWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  margin: 15px 0;
  background: url(${({ icon }) => icon}) no-repeat center;
  background-size: ${({ size }) => size};
  background-color: ${({ theme }) => theme.gray100};
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.regular};
  margin: 15px 0 30px;
`;

const StyledHeading = styled(Heading)`
  margin: 20px 0;
  font-size: ${({ theme }) => theme.fontSize.lm};
`;

const StyledLink = styled(Button)`
  display: flex;
  align-items: center;
  margin: 15px auto 0;
  text-decoration: none;
  text-align: center;
  color: ${({ theme }) => theme.dark};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  border: 2px solid ${({ theme }) => theme.notes};
  border: 2px solid ${({ theme }) => theme.notes};
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 240, 173, 0.1);
    border-color: ${({ theme }) => theme.notes100};
  }
`;

const StyledLogo = styled.svg`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 60px;
  height: 60px;
  fill: #fff;
`;

const InputItem = styled.div`
  width: 100%;
  margin: 10px 0 30px;
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px 25px 15px 35px;
  transition: 0.2s ease-out all;
  color: ${({ theme }) => theme.gray400};
  cursor: auto;
  ${({ isInvalid }) =>
    isInvalid &&
    css`
      color: hsl(4, 82%, 56%);
      top: -25px;
      font-size: ${({ theme }) => theme.fontSize.xs};
    `}
`;

const StyledInput = styled(Input)`
  width: 100%;
  border-color: ${({ theme, border }) => border || theme.gray300};
  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: -25px;
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
  ${({ border }) =>
    !border &&
    css`
      &:focus + ${Label} {
        color: ${({ theme }) => theme.dark};
      }
    `}
`;

const StyledErrorMsg = styled.div`
  margin: 0 0 20px;
  width: 90%;
  border: 1px solid hsl(4, 82%, 56%);
  background-color: hsla(4, 82%, 56%, 0.1);
  color: hsl(4, 82%, 56%);
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: 10px 20px;
  border-radius: 5px;
`;

class AuthTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverError: '',
    };
  }

  componentDidMount = () => {
    this.handleServerErrors();
  };

  componentDidUpdate = prevProps => {
    if (prevProps === this.props) return;
    this.handleServerErrors();
  };

  handleServerErrors = () => {
    const { errorID } = this.props;

    switch (errorID) {
      case null:
        this.setState({ serverError: '' });
        break;
      case 'Auth.form.error.invalid':
        this.setState({ serverError: 'Invalid username or email' });
        break;
      case 'Auth.form.error.username.taken':
        this.setState({ serverError: 'Username is already taken' });
        break;
      case 'Auth.form.error.email.taken':
        this.setState({ serverError: 'Email is already taken' });
        break;
      default:
        this.setState({ serverError: 'Something went wrong' });
    }
  };

  render() {
    const { serverError } = this.state;
    const { authType, authenticate, userID, isLoading } = this.props;
    if (userID && !isLoading) return <Redirect to={routes.notes} />;
    return (
      <StyledWrapper>
        <StyledContentWrapper>
          <StyledLogo
            xmlns="http://www.w3.org/2000/svg"
            width="71.916"
            height="44.925"
            viewBox="0 0 71.916 44.925"
          >
            <path
              d="M8.994-15.75v5.284H19.6v5.25H8.994V3.018H2.2V-21H21.037v5.25Zm30.4,14.1H29.238L27.351,3.018H20.42L31.022-21h6.691L48.349,3.018H41.281ZM37.4-6.658l-3.088-7.686L31.228-6.658ZM73.293-21,63,3.018H56.309L46.05-21h7.343L59.912-5.354,66.568-21ZM16.634,7.593V23.6H12.906L5.838,15.072V23.6H1.4V7.593H5.128L12.2,16.125V7.593ZM27.911,23.925a9.577,9.577,0,0,1-4.563-1.075A8.015,8.015,0,0,1,19.013,15.6a8.015,8.015,0,0,1,4.335-7.251,9.577,9.577,0,0,1,4.563-1.075,9.577,9.577,0,0,1,4.563,1.075A8.015,8.015,0,0,1,36.809,15.6a8.015,8.015,0,0,1-4.335,7.251A9.577,9.577,0,0,1,27.911,23.925Zm0-3.751a4.289,4.289,0,0,0,2.2-.572,4.113,4.113,0,0,0,1.555-1.613,4.883,4.883,0,0,0,.572-2.39,4.883,4.883,0,0,0-.572-2.39A4.113,4.113,0,0,0,30.107,11.6a4.5,4.5,0,0,0-4.392,0,4.113,4.113,0,0,0-1.555,1.613,4.883,4.883,0,0,0-.572,2.39,4.883,4.883,0,0,0,.572,2.39A4.113,4.113,0,0,0,25.715,19.6,4.289,4.289,0,0,0,27.911,20.173Zm14.456-8.99H37.45V7.593H51.792v3.591H46.9V23.6H42.367ZM66.339,20.1v3.5H53.484V7.593H66.042v3.5H57.968v2.7h7.114v3.385H57.968V20.1Zm4.369,3.706a2.56,2.56,0,0,1-1.853-.732,2.471,2.471,0,0,1-.755-1.853,2.444,2.444,0,0,1,.743-1.853,2.82,2.82,0,0,1,3.74,0,2.464,2.464,0,0,1,.732,1.853,2.491,2.491,0,0,1-.743,1.853A2.549,2.549,0,0,1,70.708,23.81Z"
              transform="translate(-1.4 21)"
            />
          </StyledLogo>
          <StyledForm>
            <StyledHeading as="h2">
              {authType === 'login' ? 'Sign in' : 'Sign up'}
            </StyledHeading>
            {serverError && <StyledErrorMsg>{serverError}</StyledErrorMsg>}
            <Formik
              initialValues={{ email: '', username: '', password: '' }}
              validate={({ email, username, password }) => {
                const errors = {};
                if (!email && authType === 'register')
                  errors.email = 'E-mail is required';
                if (!username) errors.username = 'Username is required';
                else if (
                  authType === 'register' &&
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
                ) {
                  errors.email = 'Invalid email address';
                }
                if (!password) errors.password = 'Password is required';
                return errors;
              }}
              onSubmit={(
                { email, username, password },
                { resetForm, setSubmitting },
              ) => {
                setTimeout(() => {
                  authenticate(email, username, password, authType);
                  resetForm();
                  setSubmitting(false);
                }, 1000);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  {authType === 'register' && (
                    <InputItem>
                      <StyledInput
                        icon={emailIcon}
                        type="text"
                        id="email"
                        name="email"
                        placeholder=" "
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        border={
                          touched.email && errors.email && 'rgb(160, 160, 160)'
                        }
                      />
                      <Label
                        htmlFor="email"
                        isInvalid={touched.email && errors.email}
                      >
                        {(errors.email && touched.email && errors.email) ||
                          'E-mail'}
                      </Label>
                    </InputItem>
                  )}
                  <InputItem>
                    <StyledInput
                      icon={userIcon}
                      type="text"
                      id="username"
                      name="username"
                      placeholder=" "
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      border={
                        touched.username &&
                        errors.username &&
                        'rgb(160, 160, 160)'
                      }
                    />
                    <Label
                      htmlFor="username"
                      isInvalid={touched.username && errors.username}
                    >
                      {(errors.username &&
                        touched.username &&
                        errors.username) ||
                        'Username'}
                    </Label>
                  </InputItem>
                  <InputItem>
                    <StyledInput
                      icon={passwordIcon}
                      type="password"
                      id="password"
                      name="password"
                      placeholder=" "
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      border={
                        touched.password &&
                        errors.password &&
                        'rgb(160, 160, 160)'
                      }
                    />
                    <Label
                      htmlFor="password"
                      isInvalid={touched.password && errors.password}
                    >
                      {(errors.password &&
                        touched.password &&
                        errors.password) ||
                        'Password'}
                    </Label>
                  </InputItem>
                  <SubmitButton centered disabled={isSubmitting}>
                    {authType === 'login' ? 'Log in' : 'Register'}
                  </SubmitButton>
                  <StyledLink
                    as={Link}
                    to={authType === 'login' ? routes.register : routes.login}
                    onClick={resetForm}
                  >
                    {authType === 'login' ? 'Sign up' : 'Sign in'}
                  </StyledLink>
                </Form>
              )}
            </Formik>
          </StyledForm>
          <Header>
            <div>
              <HeaderText as="h1">Keep your stuff in one place!</HeaderText>
              <StyledParagraph>
                Save your favorite notes, articles or even twitters!
              </StyledParagraph>
            </div>
            <HeaderImage />
            <IconsWrapper>
              <Icon size="60%" icon={penIcon} />
              <Icon size="48%" icon={BulbIcon} />
              <Icon size="68%" icon={twitterIcon} />
            </IconsWrapper>
          </Header>
        </StyledContentWrapper>
      </StyledWrapper>
    );
  }
}

AuthTemplate.propTypes = {
  authType: PropTypes.oneOf(['login', 'register']),
  authenticate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userID: PropTypes.number,
  errorID: PropTypes.string,
};

AuthTemplate.defaultProps = {
  authType: 'login',
  userID: null,
  errorID: '',
};

const mapStateToProps = ({ userID, isLoading, error: { errorID } }) => ({
  userID,
  isLoading,
  errorID,
});

const mapDispatchToProps = dispatch => ({
  authenticate: (email, username, password, authType) =>
    dispatch(authenticateAction(email, username, password, authType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(AuthTemplate));
