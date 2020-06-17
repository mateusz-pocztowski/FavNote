import React, { Component } from 'react';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItem as removeItemAction } from 'actions';

const Wrapper = styled.div`
  width: 95%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 450px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  box-shadow: 0 10px 50px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const HeadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  background-color: ${({ theme, activecolor }) => theme[activecolor]};
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px 25px 35px;
  background-color: white;
`;

const StyledParagraph = styled(Paragraph)`
  flex-basis: 100%;
  text-align: center;
`;

const StyledButton = styled(Button)`
  flex-basis: 40%;
  margin: 15px 5px 0;
  font-weight: 500;
  text-transform: none;
  border-radius: 10px;
`;

class ConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidUpdate = prevProps => {
    if (this.props === prevProps) return;
    this.handleVisibility();
  };

  handleVisibility = () => {
    const { itemType } = this.props;
    if (itemType !== null) this.setState({ visible: true });
    else this.setState({ visible: false });
  };

  handleItemRemoval = () => {
    const { removeItem, itemID, itemType, closeModal } = this.props;
    removeItem(itemType, itemID);
    closeModal();
  };

  render() {
    const { visible } = this.state;
    const { itemType, closeModal } = this.props;
    if (visible)
      return (
        <Wrapper>
          <HeadingWrapper activecolor={itemType}>
            <Heading>Are you sure?</Heading>
          </HeadingWrapper>
          <InnerWrapper>
            <StyledParagraph>This action cannot be undone.</StyledParagraph>
            <StyledButton
              activecolor={itemType}
              onClick={this.handleItemRemoval}
            >
              Remove
            </StyledButton>
            <StyledButton onClick={closeModal}>Close</StyledButton>
          </InnerWrapper>
        </Wrapper>
      );
    return null;
  }
}

ConfirmationModal.propTypes = {
  removeItem: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  itemType: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  itemID: PropTypes.number,
};

ConfirmationModal.defaultProps = {
  itemType: null,
  itemID: null,
};

const mapDispatchToProps = dispatch => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
  closeModal: () => dispatch({ type: 'CLOSE_MODAL' }),
});

const mapStateToProps = ({ modal: { itemType, itemID } }) => ({
  itemType,
  itemID,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
