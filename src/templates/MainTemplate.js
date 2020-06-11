import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import GlobalStyle from 'theme/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import PageContext from 'context';

class MainTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: 'notes',
    };
  }

  componentDidMount() {
    this.setPageType();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setPageType(prevState);
  }

  setPageType = (prevState = '') => {
    const pageTypes = ['notes', 'twitters', 'articles'];
    const {
      location: { pathname },
    } = this.props;

    const [currentPage] = pageTypes.filter(page => pathname.includes(page));
    if (prevState.pageType !== currentPage)
      this.setState({ pageType: currentPage });
  };

  render() {
    const { children } = this.props;
    const { pageType } = this.state;
    return (
      <PageContext.Provider value={pageType}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </PageContext.Provider>
    );
  }
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(MainTemplate);
