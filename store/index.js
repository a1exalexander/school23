import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import actionStringMiddleware from './middlewares/actionStringMiddleware';
import actions from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, actionStringMiddleware];

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export { actions };
export default store;
