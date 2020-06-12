import React from 'react';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TwittersView = ({ twitters }) => (
  <GridTemplate>
    {twitters.map(
      ({ id, title, twitterName, content, created_at: created }) => (
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

TwittersView.propTypes = {
  twitters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      twitterName: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    }),
  ),
};

TwittersView.defaultProps = {
  twitters: [],
};

const mapStateToProps = ({ twitters }) => ({ twitters });

export default connect(mapStateToProps)(TwittersView);
