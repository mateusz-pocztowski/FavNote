import React from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NotesView = ({ notes }) => (
  <GridTemplate>
    {notes.map(({ id, title, content, created_at: created }) => (
      <Card
        id={id}
        key={id}
        title={title}
        content={content}
        created={created}
      />
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
