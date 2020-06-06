import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import { addItem as addItemAction } from 'actions';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';

const StyledWrapper = styled.aside`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  bottom: 0;
  width: 680px;
  padding: 100px 90px;
  background-color: #ffffff;
  border-left: 10px solid ${({ theme, activecolor }) => theme[activecolor]};
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: 0.35s;
  transform: ${({ isVisible }) =>
    isVisible ? 'translateX(0%)' : 'translateX(100%)'};
`;

const StyledInput = styled(Input)`
  width: 100%;
  border: ${props => props.border || '1px solid #ccc'};
`;

const StyledTextarea = styled(StyledInput)`
  margin: 0 0 60px;
  height: 30vh;
  border-radius: 20px;
  padding-top: 30px;
  resize: none;
`;

const StyledErrorMsg = styled.p`
  margin: 15px 0 5px;
  color: hsl(4, 82%, 56%);
  padding-left: 15px;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled(Button)`
  position: relative;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
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
`;

const NewItemPanel = ({
  pageContext,
  isVisible,
  addItem,
  handleClosePanel,
}) => (
  <StyledWrapper activecolor={pageContext} isVisible={isVisible}>
    <Heading big>Add new {pageContext}</Heading>
    <Formik
      initialValues={{
        title: '',
        content: '',
        articleUrl: '',
        twitterName: '',
      }}
      validate={({ title, content, twitterName, articleUrl }) => {
        const errors = {};
        const checkUrl = string => {
          try {
            // eslint-disable-next-line no-new
            new URL(string);
            return true;
          } catch (_) {
            return false;
          }
        };

        if (!title) errors.title = 'Title is required';
        if (!content) errors.content = 'Description is required';
        if (!/^\S*$/.test(twitterName) && pageContext === 'twitters')
          errors.twitterName = `User name is e.g. hello_roman`;
        if (!twitterName && pageContext === 'twitters')
          errors.twitterName = 'Twitter name is required';
        if (!checkUrl(articleUrl) && pageContext === 'articles') {
          errors.articleUrl = 'Link is invalid';
        }
        if (!articleUrl && pageContext === 'articles')
          errors.articleUrl = 'Link is required';

        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          handleClosePanel();
          addItem(pageContext, values);
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
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <StyledErrorMsg>
            {errors.title && touched.title && errors.title}
          </StyledErrorMsg>
          <StyledInput
            border={
              touched.title && errors.title && `1px solid hsl(4, 82%, 56%)`
            }
            name="title"
            type="text"
            placeholder={pageContext === 'twitters' ? 'Name' : 'Title'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            activecolor={pageContext}
          />
          <StyledErrorMsg>
            {errors.twitterName && touched.twitterName && errors.twitterName}
            {errors.articleUrl && touched.articleUrl && errors.articleUrl}
          </StyledErrorMsg>
          {pageContext !== 'notes' && (
            <StyledInput
              name={pageContext === 'twitters' ? 'twitterName' : 'articleUrl'}
              type="text"
              placeholder={
                pageContext === 'twitters' ? 'Twitter user name' : 'Link'
              }
              activecolor={pageContext}
              onChange={handleChange}
              onBlur={handleBlur}
              border={
                (touched.twitterName || touched.articleUrl) &&
                (errors.twitterName || errors.articleUrl) &&
                '1px solid hsl(4, 82%, 56%)'
              }
              value={
                pageContext === 'twitters'
                  ? values.twitterName
                  : values.articleUrl
              }
            />
          )}
          <StyledErrorMsg>
            {errors.content && touched.content && errors.content}
          </StyledErrorMsg>
          <StyledTextarea
            as="textarea"
            name="content"
            placeholder="Description"
            onChange={handleChange}
            onBlur={handleBlur}
            activecolor={pageContext}
            value={values.content}
            border={
              touched.content && errors.content && '1px solid hsl(4, 82%, 56%)'
            }
          />
          <StyledButton
            type="submit"
            disabled={isSubmitting}
            activecolor={pageContext}
          >
            Add Item
          </StyledButton>
        </Form>
      )}
    </Formik>
  </StyledWrapper>
);

NewItemPanel.propTypes = {
  pageContext: PropTypes.oneOf([
    'login',
    'register',
    'notes',
    'twitters',
    'articles',
  ]).isRequired,
  isVisible: PropTypes.bool.isRequired,
  addItem: PropTypes.func.isRequired,
  handleClosePanel: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addItem: (itemType, itemContent) =>
    dispatch(addItemAction(itemType, itemContent)),
});

export default connect(null, mapDispatchToProps)(withContext(NewItemPanel));
