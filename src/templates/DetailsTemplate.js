import React from 'react';
import styled, { css } from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import UserPageTemplate from 'templates/UserPageTemplate';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import withContext from 'hoc/withContext';
import Moment from 'react-moment';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  padding: 25px 0 0 70px;
  max-width: 650px;
`;

const PageHeader = styled.div`
  margin: 70px 0 30px;
  ${({ pageContext }) =>
    pageContext === 'twitters' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}
`;

const InnerWrapper = styled.div`
  ${({ pageContext }) =>
    pageContext === 'twitters' &&
    css`
      max-width: 400px;
    `}
`;

const StyledHeading = styled(Heading)`
  margin: 0;
`;

const StyledDate = styled(Paragraph)`
  margin: 10px 0;
  font-weight: ${({ theme }) => theme.bold};
  color: hsl(0, 0%, 25%);
`;

const StyledContent = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.light};
  line-height: 1.25;
`;

const StyledOptionsWrapper = styled.div`
  margin: 30px 0;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 15px;
  }
`;

const StyledAvatar = styled.a`
  display: block;
  width: 100px;
  height: 100px;
  background: url(${({ img }) => img}) no-repeat;
  background-color: white;
  background-position: center;
  background-size: 100%;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.twitters};
  box-shadow: 0 10px 20px -10px hsla(0, 0%, 0%, 0.2);
  transition: 0.3s;
  &:hover {
    border-color: ${({ theme }) => theme.dark};
  }
`;

const StyledLink = styled(Paragraph)`
  display: block;
  text-decoration: none;
  text-align: center;
  color: ${({ theme }) => theme.dark};
  background-color: ${({ theme }) => theme.gray200};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  max-width: 180px;
  padding: 10px;
  border-radius: 5px;
  transition: 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.gray300};
  }
`;

const DetailsTemplate = ({
  pageContext,
  title,
  content,
  articleUrl,
  twitterName,
  created,
}) => {
  return (
    <UserPageTemplate>
      <Wrapper
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, x: '-10vw' }}
        animate={{ opacity: 1, x: '0' }}
        exit={{ opacity: 0, x: '-10vw' }}
      >
        <PageHeader pageContext={pageContext}>
          <InnerWrapper pageContext={pageContext}>
            <StyledHeading big as="h1">
              {title}
            </StyledHeading>
            <StyledDate as={Moment} fromNow>
              {created}
            </StyledDate>
          </InnerWrapper>
          {pageContext === 'twitters' && (
            <StyledAvatar
              img={`http://twivatar.glitch.me/${twitterName}`}
              href={`https://twitter.com/${twitterName}`}
              target="_blanket"
            />
          )}
        </PageHeader>
        <StyledContent>{content}</StyledContent>
        {pageContext === 'notes' ? null : (
          <StyledLink
            as="a"
            href={
              pageContext === 'twitters'
                ? `https://twitter.com/${twitterName}`
                : articleUrl
            }
            target="_blanket"
          >
            {pageContext === 'twitters' && 'Visit on Twitter'}
            {pageContext === 'articles' && 'Open this article'}
          </StyledLink>
        )}
        <StyledOptionsWrapper>
          <Button as={Link} to={routes[pageContext]} activecolor={pageContext}>
            Close / Save
          </Button>
          <Button secondary>Remove</Button>
        </StyledOptionsWrapper>
      </Wrapper>
    </UserPageTemplate>
  );
};

DetailsTemplate.propTypes = {
  pageContext: PropTypes.oneOf([
    'login',
    'register',
    'notes',
    'twitters',
    'articles',
  ]).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  articleUrl: PropTypes.string,
  twitterName: PropTypes.string,
};

DetailsTemplate.defaultProps = {
  articleUrl: null,
  twitterName: null,
};

export default withContext(DetailsTemplate);
