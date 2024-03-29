import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import actionStringMiddleware from './middlewares/actionStringMiddleware';
import actions from './actions';
import { createWrapper } from 'next-redux-wrapper';

let composeEnhancers = compose;

if (process.browser) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const middlewares = [thunk, actionStringMiddleware];

export const makeStore = (context) =>
  createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));

export const wrapper = createWrapper(makeStore, { debug: false });

export { actions };
export default wrapper;
