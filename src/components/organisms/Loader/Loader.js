import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logoImg from 'assets/icons/logo.svg';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: 0.3s ease-in;
  background-color: ${({ theme }) => theme.dark};
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

const Logo = styled(motion.div)`
  width: 150px;
  height: 150px;
  background: url(${logoImg}) no-repeat center;
  background-size: 100%;
  filter: invert(1);
`;

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidUpdate = prevProps => {
    this.toggleLoader(prevProps);
  };

  toggleLoader = prevProps => {
    if (prevProps === this.props) return;
    const { isLoading } = this.props;
    if (!isLoading) setTimeout(() => this.setState({ isLoading }), 2000);
    else this.setState({ isLoading });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Wrapper
        visible={isLoading}
        animate={{
          backgroundColor: ['rgb(255, 216, 41)', 'rgb(138, 216, 244)'],
        }}
        transition={{ duration: 3, yoyo: Infinity }}
      >
        <Logo
          animate={{ opacity: 0.5 }}
          transition={{
            yoyo: Infinity,
            duration: 1,
            ease: 'easeInOut',
          }}
        />
      </Wrapper>
    );
  }
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isLoading }) => ({ isLoading });

export default connect(mapStateToProps)(Loader);
