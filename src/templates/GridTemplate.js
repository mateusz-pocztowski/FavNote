import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from 'components/atoms/Input/Input';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import UserPageTemplate from 'templates/UserPageTemplate';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import plusIcon from 'assets/icons/plus.svg';
import withContext from 'hoc/withContext';
import NewItemPanel from 'components/organisms/NewItemPanel/NewItemPanel';
import emptyStateImg from 'assets/images/emptyState.png';
import { AnimatePresence, motion } from 'framer-motion';

const Wrapper = styled.div`
  position: relative;
  padding: 15px 15px 80px;

  ${({ theme }) => theme.mq.smallTablet} {
    padding: 25px 110px 25px 40px;
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 25px 150px 25px 60px;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 45px;

  ${({ theme }) => theme.mq.desktop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mq.bigDesktop} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 85px;
  }
`;

const PageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;
  text-transform: capitalize;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledAddButton = styled(ButtonIcon)`
  width: 55px;
  height: 55px;
  position: fixed;
  z-index: 11;
  bottom: 5px;
  right: 10px;
  background-size: 35%;
  border-radius: 50%;
  background-color: transparent;
  transform: ${({ isPanelVisible }) =>
    isPanelVisible ? 'rotate(45deg)' : 'rotate(0)'};
  &:hover {
    background-color: ${({ theme, activecolor }) => theme[`${activecolor}100`]};
    opacity: 0.8;
  }
  ${({ theme }) => theme.mq.smallTablet} {
    bottom: 20px;
    right: 20px;
    width: 62px;
    height: 62px;
    background-color: ${({ theme, activecolor }) => theme[activecolor]};
  }
  ${({ theme }) => theme.mq.tablet} {
    width: 67px;
    height: 67px;
    bottom: 40px;
    right: 40px;
  }
`;

const EmptyStateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 0.7;
  text-align: center;
  padding: 0 20px;
`;

const EmptyState = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  height: 270px;
  background: url(${emptyStateImg}) no-repeat center;
  background-size: 100%;
`;

const StyledEmptyHeading = styled(Heading)`
  margin: 20px 0 0;
`;

class GridTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelVisible: false,
      items: [],
      search: '',
    };
  }

  componentDidMount = () => {
    this.setState({ search: '' });
    this.showItems();
  };

  componentDidUpdate = (prevProps, prevState) => {
    this.showItems(prevProps, prevState);
  };

  showItems = (prevProps = '', prevState) => {
    const { children } = this.props;
    const { search } = this.state;

    if (prevProps === this.props && prevState.search === search) return;
    this.setState({
      items: children
        .filter(item => item.props.keywords.toLowerCase().includes(search))
        .reverse(),
    });
  };

  handleSearch = e => {
    if (e.target.value.length >= 40) return;
    this.setState({ search: e.target.value.toLowerCase() });
  };

  handlePanelVisibility = () => {
    this.setState(prevState => ({
      isPanelVisible: !prevState.isPanelVisible,
    }));
  };

  render() {
    const { pageContext } = this.props;
    const { isPanelVisible, items, search } = this.state;
    return (
      <UserPageTemplate>
        <Wrapper>
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: '-10vh' }}
            animate={{ opacity: 1, y: '0' }}
            exit={{ opacity: 0, y: '-10vh' }}
          >
            <PageHeader>
              <Input
                icon="search"
                placeholder="Search"
                activecolor={pageContext}
                value={search}
                onChange={this.handleSearch}
              />
              <StyledHeading big as="h1">
                {pageContext}
              </StyledHeading>
              {items.length !== 0 && (
                <StyledParagraph>
                  {items.length} {pageContext}
                </StyledParagraph>
              )}
            </PageHeader>
          </motion.div>
          <motion.div
            transition={{ duration: 0.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {items.length === 0 ? (
              <EmptyStateWrapper>
                <EmptyState />
                <StyledEmptyHeading>
                  It&apos;s empty in here..
                </StyledEmptyHeading>
                <Paragraph>
                  {search
                    ? `There are no ${pageContext} matching "${search}".`
                    : `Go and add some ${pageContext}! They won't go anywhere.`}
                </Paragraph>
              </EmptyStateWrapper>
            ) : (
              <GridWrapper>
                <AnimatePresence>{items}</AnimatePresence>
              </GridWrapper>
            )}
          </motion.div>
          <StyledAddButton
            isPanelVisible={isPanelVisible}
            onClick={this.handlePanelVisibility}
            icon={plusIcon}
            activecolor={pageContext}
          />
          <NewItemPanel
            handleClosePanel={() => this.handlePanelVisibility()}
            isVisible={isPanelVisible}
          />
        </Wrapper>
      </UserPageTemplate>
    );
  }
}

GridTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GridTemplate.defaultProps = {
  pageContext: 'notes',
};

export default withContext(GridTemplate);
