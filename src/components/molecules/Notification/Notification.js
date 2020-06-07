import React, { Component } from 'react';
import styled from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import errorIcon from 'assets/icons/error.svg';
import checkIcon from 'assets/icons/checkmark.svg';
import closeIcon from 'assets/icons/close.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  background-color: #fff;
  border-radius: 3px 5px 5px 3px;
  border-left: 5px solid;
  border-color: ${({ status }) =>
    status !== 200 ? 'hsl(4, 82%, 56%)' : 'hsl(170, 58%, 47%)'};
  z-index: 30;
  box-shadow: 0 0 30px -10px hsla(0, 0%, 0%, 0.2);
  padding: 20px 40px 20px 20px;
  display: flex;
  align-items: center;
  transition: transform 0.5s ease-in-out;
  transform: ${({ visible }) =>
    visible ? 'translateX(0)' : 'translateX(370px)'};
  & > div:first-child {
    background: url(${({ status }) => (status !== 200 ? errorIcon : checkIcon)})
      no-repeat center;
  }
`;

const Icon = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 15px;
`;

const Text = styled(Paragraph)`
  max-width: 200px;
  opacity: 0.7;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 14px;
  height: 14px;
  opacity: 0.7;
  background: url(${closeIcon}) no-repeat center;
  cursor: pointer;
`;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      visible: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;
    this.openNotification();
  }

  openNotification = () => {
    this.setState({ visible: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.closeNotification, 3000);
  };

  closeNotification = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      message: { status, content },
    } = this.props;
    const { visible } = this.state;
    return (
      <Wrapper status={status} visible={visible}>
        <Icon />
        <Text>{content || 'Something went wrong!'}</Text>
        <CloseBtn onClick={this.closeNotification} />
      </Wrapper>
    );
  }
}

Notification.propTypes = {
  message: PropTypes.shape({
    status: PropTypes.number,
    content: PropTypes.string,
  }),
};

Notification.defaultProps = {
  message: {
    status: null,
    content: null,
  },
};

const mapStateToProps = ({ message }) => ({ message });

export default connect(mapStateToProps)(Notification);
