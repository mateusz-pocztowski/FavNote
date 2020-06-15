import React from 'react';
import styled, { css } from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import UserPageTemplate from 'templates/UserPageTemplate';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes } from 'routes';
import withContext from 'hoc/withContext';
import Moment from 'react-moment';
import { motion } from 'framer-motion';
import defaultImg from 'assets/images/default.png';
import { openModal as openModalAction } from 'actions';

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
  white-space: pre-wrap;
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
  background-image: url(${({ img }) => img}), url(${defaultImg});
  background-repeat: no-repeat;
  background-color: white;
  background-position: center;
  background-size: 100%;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.twitters};
  box-shadow: 0 10px 20px -10px hsla(0, 0%, 0%, 0.2);
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
  itemID,
  pageContext,
  title,
  content,
  articleUrl,
  twitterName,
  created,
  openModal,
}) => {
  if (!itemID) return <Redirect to={routes[pageContext]} />;
  return (
    <UserPageTemplate>
      <Wrapper
        transition={{ duration: 0.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
          <Button onClick={() => openModal(pageContext, itemID)} secondary>
            Remove
          </Button>
        </StyledOptionsWrapper>
      </Wrapper>
    </UserPageTemplate>
  );
};

DetailsTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  openModal: PropTypes.func.isRequired,
  itemID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  articleUrl: PropTypes.string,
  twitterName: PropTypes.string,
};

DetailsTemplate.defaultProps = {
  pageContext: 'notes',
  articleUrl: null,
  twitterName: null,
};

const mapDispatchToProps = dispatch => ({
  openModal: (itemType, itemID) => dispatch(openModalAction(itemType, itemID)),
});

export default connect(null, mapDispatchToProps)(withContext(DetailsTemplate));
