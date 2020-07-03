/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PageContext from 'context';

const withContext = Component => ({ ...props }) => (
  <PageContext.Consumer>
    {context => <Component {...props} pageContext={context} />}
  </PageContext.Consumer>
);

export default withContext;
