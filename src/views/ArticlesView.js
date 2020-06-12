import React from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ArticlesView = ({ articles }) => (
  <GridTemplate>
    {articles.map(({ id, title, articleUrl, content, created_at: created }) => (
      <Card
        id={id}
        key={id}
        articleUrl={articleUrl}
        title={title}
        content={content}
        created={created}
      />
    ))}
  </GridTemplate>
);

ArticlesView.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    }),
  ),
};

ArticlesView.defaultProps = {
  articles: [],
};

const mapStateToProps = ({ articles }) => ({ articles });

export default connect(mapStateToProps)(ArticlesView);
