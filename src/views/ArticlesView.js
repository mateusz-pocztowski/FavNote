import React, { Component } from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems } from 'actions';

class ArticlesView extends Component {
  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles();
  }

  render() {
    const { articles } = this.props;
    return (
      <GridTemplate>
        {articles.map(
          ({ id, title, articleUrl, content, created_at: created }) => (
            <Card
              id={id}
              key={id}
              articleUrl={articleUrl}
              title={title}
              content={content}
              created={created}
            />
          ),
        )}
      </GridTemplate>
    );
  }
}

ArticlesView.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch(fetchItems('articles')),
});

const mapStateToProps = ({ articles }) => ({ articles });

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesView);
