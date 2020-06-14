import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import SubmitButton from 'components/molecules/SubmitButton/SubmitButton';
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

const InputItem = styled.div`
  width: 100%;
  margin: 50px 0;
  position: relative;
  cursor: auto;
`;

const InputArea = styled(InputItem)`
  margin-bottom: 60px;
  height: 25vh;
`;

const Label = styled.label`
  position: absolute;
  top: -28px;
  left: 5px;
  transition: 0.2s ease-out all;
  color: ${({ theme }) => theme.gray400};
  cursor: auto;
  font-size: ${({ theme }) => theme.fontSize.xsm};
  ${({ isInvalid }) =>
    isInvalid &&
    css`
      color: hsl(4, 82%, 56%);
    `}
`;

const StyledInput = styled(Input)`
  width: 100%;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${({ border, theme }) => border || theme.gray300};
  background-color: ${({ theme }) => theme.gray100};
  ${({ border }) =>
    !border &&
    css`
      &:focus + ${Label} {
        color: ${({ theme }) => theme.dark};
      }
    `}
`;

const StyledTextarea = styled(StyledInput)`
  height: 100%;
  resize: none;
  white-space: pre-line;
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
          <InputItem>
            <StyledInput
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              activecolor={pageContext}
              border={touched.title && errors.title && 'hsl(4, 82%, 56%)'}
            />
            <Label htmlFor="title" isInvalid={touched.title && errors.title}>
              {(errors.title && touched.title && errors.title) || 'Title'}
            </Label>
          </InputItem>
          {pageContext !== 'notes' && (
            <InputItem>
              <StyledInput
                type="text"
                id={pageContext === 'twitters' ? 'twitterName' : 'articleUrl'}
                name={pageContext === 'twitters' ? 'twitterName' : 'articleUrl'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={
                  pageContext === 'twitters'
                    ? values.twitterName
                    : values.articleUrl
                }
                activecolor={pageContext}
                border={
                  (touched.twitterName || touched.articleUrl) &&
                  (errors.twitterName || errors.articleUrl) &&
                  'hsl(4, 82%, 56%)'
                }
              />
              <Label
                htmlFor={
                  pageContext === 'twitters' ? 'twitterName' : 'articleUrl'
                }
                isInvalid={
                  (touched.twitterName && errors.twitterName) ||
                  (touched.articleUrl && errors.articleUrl)
                }
              >
                {(errors.twitterName &&
                  touched.twitterName &&
                  errors.twitterName) ||
                  (pageContext === 'twitters' && 'Twitter Name')}
                {(errors.articleUrl &&
                  touched.articleUrl &&
                  errors.articleUrl) ||
                  (pageContext === 'articles' && 'Link')}
              </Label>
            </InputItem>
          )}
          <InputArea>
            <StyledTextarea
              as="textarea"
              type="text"
              id="content"
              name="content"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
              activecolor={pageContext}
              border={touched.content && errors.content && 'hsl(4, 82%, 56%)'}
            />
            <Label
              htmlFor="content"
              isInvalid={touched.content && errors.content}
            >
              {(errors.content && touched.content && errors.content) ||
                'Description'}
            </Label>
          </InputArea>
          <SubmitButton disabled={isSubmitting} activecolor={pageContext}>
            Add Item
          </SubmitButton>
        </Form>
      )}
    </Formik>
  </StyledWrapper>
);

NewItemPanel.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  isVisible: PropTypes.bool.isRequired,
  addItem: PropTypes.func.isRequired,
  handleClosePanel: PropTypes.func.isRequired,
};

NewItemPanel.defaultProps = {
  pageContext: 'notes',
};

const mapDispatchToProps = dispatch => ({
  addItem: (itemType, itemContent) =>
    dispatch(addItemAction(itemType, itemContent)),
});

export default connect(null, mapDispatchToProps)(withContext(NewItemPanel));
