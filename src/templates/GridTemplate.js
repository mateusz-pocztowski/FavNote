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

const Wrapper = styled.div`
  position: relative;
  padding: 25px 150px 25px 70px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 45px;

  @media (min-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1500px) {
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
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 11;
  background-size: 35%;
  background-color: ${({ theme, activecolor }) => theme[activecolor]};
  border-radius: 50%;
  transform: ${({ isPanelVisible }) =>
    isPanelVisible ? 'rotate(45deg)' : 'rotate(0)'};
  &:hover {
    background-color: ${({ theme, activecolor }) => theme[`${activecolor}100`]};
    opacity: 0.8;
  }
`;

class GridTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelVisible: false,
    };
  }

  handlePanelVisibility = () => {
    this.setState(prevState => ({
      isPanelVisible: !prevState.isPanelVisible,
    }));
  };

  render() {
    const { pageContext, children } = this.props;
    const { isPanelVisible } = this.state;
    return (
      <UserPageTemplate>
        <Wrapper>
          <PageHeader>
            <Input search placeholder="Search" />
            <StyledHeading big as="h1">
              {pageContext}
            </StyledHeading>
            <StyledParagraph>
              {children.length} {pageContext}
            </StyledParagraph>
          </PageHeader>
          <GridWrapper>{children}</GridWrapper>
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
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageContext: PropTypes.oneOf([
    'login',
    'register',
    'notes',
    'twitters',
    'articles',
  ]).isRequired,
};

export default withContext(GridTemplate);
