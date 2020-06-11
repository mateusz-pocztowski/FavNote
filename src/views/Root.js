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
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from 'utils/PrivateRoute';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <AnimatePresence>
          <Switch>
            <Route
              exact
              path={routes.home}
              render={() =>
                store.getState().userJWT ? (
                  <Redirect to={routes.notes} />
                ) : (
                  <Redirect to={routes.login} />
                )
              }
            />
            <Route exact path={routes.login} component={AuthView} />
            <Route exact path={routes.register} component={AuthView} />
            <PrivateRoute
              exact
              path={routes.notes}
              component={NotesView}
              token={store.getState().userJWT}
            />
            <PrivateRoute
              path={routes.note}
              component={DetailsView}
              token={store.getState().userJWT}
            />
            <PrivateRoute
              exact
              path={routes.twitters}
              component={TwittersView}
              token={store.getState().userJWT}
            />
            <PrivateRoute
              path={routes.twitter}
              component={DetailsView}
              token={store.getState().userJWT}
            />
            <PrivateRoute
              exact
              path={routes.articles}
              component={ArticlesView}
              token={store.getState().userJWT}
            />
            <PrivateRoute
              path={routes.article}
              component={DetailsView}
              token={store.getState().userJWT}
            />
          </Switch>
        </AnimatePresence>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
