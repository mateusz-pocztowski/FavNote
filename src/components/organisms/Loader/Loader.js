import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { hideLoader as hideLoaderAction } from 'actions';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: #ffffff;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  background-image: linear-gradient(
    to right top,
    #ffd829,
    #fddb48,
    #fadd60,
    #f8e075,
    #f6e289
  );
`;

const Logo = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.2));
`;

const LogoSvg = styled.svg`
  width: 150px;
  height: 150px;
`;

const Dot = styled(motion.div)`
  position: absolute;
  right: -25px;
  bottom: 29px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ffffff;
`;

const loaderVariants = {
  animation: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: 'easeOut',
      },
    },
  },
};

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.toggleLoader();
  };

  componentDidUpdate = prevProps => {
    this.toggleLoader(prevProps);
  };

  toggleLoader = prevProps => {
    if (prevProps === this.props) return;
    const { isLoading, hideLoader } = this.props;
    setTimeout(hideLoader, 2000);
    this.setState({ isLoading });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Wrapper visible={isLoading}>
        <Logo>
          <LogoSvg
            xmlns="http://www.w3.org/2000/svg"
            width="71.916"
            height="44.925"
            viewBox="0 0 71.916 44.925"
            fill="#ffffff"
          >
            <path
              d="M8.994-15.75v5.284H19.6v5.25H8.994V3.018H2.2V-21H21.037v5.25Zm30.4,14.1H29.238L27.351,3.018H20.42L31.022-21h6.691L48.349,3.018H41.281ZM37.4-6.658l-3.088-7.686L31.228-6.658ZM73.293-21,63,3.018H56.309L46.05-21h7.343L59.912-5.354,66.568-21ZM16.634,7.593V23.6H12.906L5.838,15.072V23.6H1.4V7.593H5.128L12.2,16.125V7.593ZM27.911,23.925a9.577,9.577,0,0,1-4.563-1.075A8.015,8.015,0,0,1,19.013,15.6a8.015,8.015,0,0,1,4.335-7.251,9.577,9.577,0,0,1,4.563-1.075,9.577,9.577,0,0,1,4.563,1.075A8.015,8.015,0,0,1,36.809,15.6a8.015,8.015,0,0,1-4.335,7.251A9.577,9.577,0,0,1,27.911,23.925Zm0-3.751a4.289,4.289,0,0,0,2.2-.572,4.113,4.113,0,0,0,1.555-1.613,4.883,4.883,0,0,0,.572-2.39,4.883,4.883,0,0,0-.572-2.39A4.113,4.113,0,0,0,30.107,11.6a4.5,4.5,0,0,0-4.392,0,4.113,4.113,0,0,0-1.555,1.613,4.883,4.883,0,0,0-.572,2.39,4.883,4.883,0,0,0,.572,2.39A4.113,4.113,0,0,0,25.715,19.6,4.289,4.289,0,0,0,27.911,20.173Zm14.456-8.99H37.45V7.593H51.792v3.591H46.9V23.6H42.367ZM66.339,20.1v3.5H53.484V7.593H66.042v3.5H57.968v2.7h7.114v3.385H57.968V20.1Zm4.369"
              transform="translate(-1.4 21)"
            />
          </LogoSvg>
          <Dot variants={loaderVariants} animate="animation" />
        </Logo>
      </Wrapper>
    );
  }
}

Loader.propTypes = {
  hideLoader: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isLoading }) => ({ isLoading });

const mapDispatchToProps = dispatch => ({
  hideLoader: () => dispatch(hideLoaderAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
