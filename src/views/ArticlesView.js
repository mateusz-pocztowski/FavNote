import React from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ArticlesView = ({ articles }) => (
  <GridTemplate>
    {articles.map(({ id, title, content, created_at: created, articleUrl }) => (
      <motion.div
        key={id}
        keywords={title + content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35 } }}
        exit={{ opacity: 0, transition: { duration: 0.35 } }}
      >
        <Card
          id={id}
          articleUrl={articleUrl}
          title={title}
          content={content}
          created={created}
        />
      </motion.div>
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
