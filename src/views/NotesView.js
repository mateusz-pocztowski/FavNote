import React, { Component } from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems } from 'actions';

class NotesView extends Component {
  componentDidMount() {
    const { fetchNotes } = this.props;
    fetchNotes();
  }

  render() {
    const { notes } = this.props;
    return (
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
  }
}

NotesView.propTypes = {
  fetchNotes: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchItems('notes')),
});

const mapStateToProps = ({ notes }) => ({ notes });

export default connect(mapStateToProps, mapDispatchToProps)(NotesView);
