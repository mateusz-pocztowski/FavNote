import React, { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

class DetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        title: '',
        content: '',
        articleUrl: '',
        twitterName: '',
        created_at: '',
      },
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      pageContext,
    } = this.props;
    axios
      .get(`http://localhost:1337/${pageContext}/${id}`)
      .then(({ data }) => {
        this.setState({ activeItem: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { activeItem } = this.state;
    return (
      <DetailsTemplate
        title={activeItem.title}
        content={activeItem.content}
        articleUrl={activeItem.articleUrl}
        twitterName={activeItem.twitterName}
        created={activeItem.created_at}
      />
    );
  }
}

DetailsView.propTypes = {
  pageContext: PropTypes.oneOf([
    'login',
    'register',
    'notes',
    'twitters',
    'articles',
  ]).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  if (state[ownProps.pageContext]) {
    return {
      activeItem: state[ownProps.pageContext].filter(
        item => item.id === ownProps.match.params.id,
      ),
    };
  }
  return {};
};

export default withContext(connect(mapStateToProps)(DetailsView));
