import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import linkIcon from 'assets/icons/link.svg';
import defaultImg from 'assets/images/default.png';
import { connect } from 'react-redux';
import { openModal as openModalAction } from 'actions';
import withContext from 'hoc/withContext';
import Moment from 'react-moment';

const Wrapper = styled.div`
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  min-height: 380px;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

const InnerWrapper = styled.div`
  position: relative;
  padding: 17px 30px;
  background-color: ${({ theme, activecolor }) =>
    theme[activecolor] || 'white'};
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      ${flex === 'column' &&
      css`
        flex-direction: column;
        align-items: stretch;
        & > button:last-child {
          margin-top: auto;
        }
      `}
    `}
`;

const ItemsWrapper = styled.div`
  margin: 0;
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      & > * {
        margin-right: 10px;
      }
    `}
`;

const DateInfo = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0 0;
`;

const Avatar = styled.a`
  display: block;
  position: absolute;
  background-image: url(${({ img }) => img}), url(${defaultImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-color: white;
  top: 25px;
  right: 25px;
  z-index: 1;
  border-radius: 50%;
  width: 86px;
  height: 86px;
  border: 5px solid ${({ theme }) => theme.twitters};
  box-shadow: 0 10px 30px 0 hsla(0, 0%, 0%, 0.15);
`;

const LinkButton = styled.a`
  display: block;
  width: 47px;
  height: 47px;
  border-radius: 50%;
  background: white url(${linkIcon}) no-repeat;
  background-position: center;
`;

const StyledContent = styled(Paragraph)`
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleClick = () => this.setState({ redirect: true });

  render() {
    const {
      id,
      pageContext,
      title,
      twitterName,
      articleUrl,
      content,
      created,
      openModal,
    } = this.props;
    const { redirect } = this.state;
    if (redirect) return <Redirect to={`${pageContext}/${id}`} />;
    return (
      <Wrapper>
        <InnerWrapper activecolor={pageContext} flex="row">
          <ItemsWrapper>
            <StyledHeading>{title}</StyledHeading>
            <DateInfo as={Moment} fromNow>
              {created}
            </DateInfo>
          </ItemsWrapper>
          {pageContext === 'twitters' && (
            <Avatar
              img={`http://twivatar.glitch.me/${twitterName}`}
              href={`https://twitter.com/${twitterName}`}
              target="_blanket"
            />
          )}
          {pageContext === 'articles' && (
            <LinkButton href={articleUrl} target="_blanket" />
          )}
        </InnerWrapper>
        <InnerWrapper flex="column">
          <StyledContent>{content}</StyledContent>
          <ItemsWrapper flex>
            <Button
              onClick={this.handleClick}
              secondary
              activecolor={pageContext}
            >
              Open
            </Button>
            <Button onClick={() => openModal(pageContext, id)} secondary>
              Remove
            </Button>
          </ItemsWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

Card.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  title: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};

Card.defaultProps = {
  pageContext: 'notes',
  twitterName: null,
  articleUrl: null,
};

const mapDispatchToProps = dispatch => ({
  openModal: (itemType, itemID) => dispatch(openModalAction(itemType, itemID)),
});

export default connect(null, mapDispatchToProps)(withContext(Card));
