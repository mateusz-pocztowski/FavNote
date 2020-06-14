import React from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const NotesView = ({ notes }) => (
  <GridTemplate>
    {notes.map(({ id, title, content, created_at: created }) => (
      <motion.div
        key={id}
        keywords={title + content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35 } }}
        exit={{ opacity: 0, transition: { duration: 0.35 } }}
      >
        <Card id={id} title={title} content={content} created={created} />
      </motion.div>
    ))}
  </GridTemplate>
);

NotesView.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    }),
  ),
};

NotesView.defaultProps = {
  notes: [],
};

const mapStateToProps = ({ notes }) => ({ notes });

export default connect(mapStateToProps)(NotesView);
