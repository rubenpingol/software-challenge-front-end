import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import history from './history'

let middleware = [
    thunkMiddleware,
    routerMiddleware(history)
].filter(Boolean);

let createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const configureStore = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default configureStore;