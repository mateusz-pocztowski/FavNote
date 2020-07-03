import { createStore, applyMiddleware } from 'redux';
import rootReducer, { initialState } from 'reducers';
import thunk from 'redux-thunk';

const persistedState = localStorage.getItem('favnoteState')
  ? JSON.parse(localStorage.getItem('favnoteState'))
  : initialState;

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem('favnoteState', JSON.stringify(store.getState()));
});

export default store;
