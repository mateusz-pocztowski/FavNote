import React, { Component } from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems } from 'actions';

class TwittersView extends Component {
  componentDidMount() {
    const { fetchTwitters } = this.props;
    fetchTwitters();
  }

  render() {
    const { twitters } = this.props;
    return (
      <GridTemplate>
        {twitters.map(
          ({ id, twitterName, title, created_at: created, content }) => (
            <Card
              id={id}
              key={id}
              twitterName={twitterName}
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

TwittersView.propTypes = {
  fetchTwitters: PropTypes.func.isRequired,
  twitters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      twitterName: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    }),
  ),
};

TwittersView.defaultProps = {
  twitters: [],
};

const mapDispatchToProps = dispatch => ({
  fetchTwitters: () => dispatch(fetchItems('twitters')),
});

const mapStateToProps = ({ twitters }) => ({ twitters });

export default connect(mapStateToProps, mapDispatchToProps)(TwittersView);
