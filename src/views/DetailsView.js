import React from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DetailsView = ({
  activeItem: {
    id,
    title,
    content,
    articleUrl,
    twitterName,
    created_at: created,
  },
}) => (
  <DetailsTemplate
    itemID={id}
    title={title}
    content={content}
    articleUrl={articleUrl}
    twitterName={twitterName}
    created={created}
  />
);

DetailsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  activeItem: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    articleUrl: PropTypes.string,
    twitterName: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

DetailsView.defaultProps = {
  activeItem: {
    id: '',
    title: '',
    content: '',
    articleUrl: '',
    twitterName: '',
    created_at: '',
  },
};

const mapStateToProps = (state, ownProps) => {
  if (!state[ownProps.pageContext]) return {};
  return {
    activeItem: state[ownProps.pageContext].find(
      item => item.id === Number(ownProps.match.params.id),
    ),
  };
};

export default withContext(connect(mapStateToProps)(DetailsView));
