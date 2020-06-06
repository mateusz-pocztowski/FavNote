import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainTemplate from 'templates/MainTemplate';
import AuthView from 'views/AuthView';
import NotesView from 'views/NotesView';
import TwittersView from 'views/TwittersView';
import ArticlesView from 'views/ArticlesView';
import DetailsView from 'views/DetailsView';
import { routes } from 'routes';
import store from 'store';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          {store.getState().userID && <Redirect to={routes.login} />}
          <Route exact path={routes.login} component={AuthView} />
          <Route exact path={routes.register} component={AuthView} />
          <Route
            exact
            path={routes.home}
            render={() => <Redirect to={routes.login} />}
          />
          <Route exact path={routes.notes} component={NotesView} />
          <Route path={routes.note} component={DetailsView} />
          <Route exact path={routes.twitters} component={TwittersView} />
          <Route path={routes.twitter} component={DetailsView} />
          <Route exact path={routes.articles} component={ArticlesView} />
          <Route path={routes.article} component={DetailsView} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
