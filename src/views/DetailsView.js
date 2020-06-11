import React from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DetailsView = ({ activeItem }) => (
  <DetailsTemplate
    title={activeItem.title}
    content={activeItem.content}
    articleUrl={activeItem.articleUrl}
    twitterName={activeItem.twitterName}
    created={activeItem.created_at}
  />
);

DetailsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  activeItem: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    articleUrl: PropTypes.string,
    twitterName: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

DetailsView.defaultProps = {
  activeItem: {
    title: '',
    content: '',
    articleUrl: '',
    twitterName: '',
    created_at: '',
  },
};

const mapStateToProps = (state, ownProps) => {
  const currentItem = state[ownProps.pageContext].find(
    item => item.id === Number(ownProps.match.params.id),
  );
  if (currentItem) {
    return {
      activeItem: currentItem,
    };
  }
  return {};
};

export default withContext(connect(mapStateToProps)(DetailsView));
