import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import createSagaMiddleware from "redux-saga";
import { createStore, compose, applyMiddleware } from "redux";
import rootSaga from "./redux/sagas/sagas";
import rootReducer from "./redux/root-reducer";


const initialSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(initialSagaMiddleware),
  ),
);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

initialSagaMiddleware.run(rootSaga);
ReactDOM.render(<CookiesProvider>
  <Provider store={store}>
    <App />
    {' '}
  </Provider>
</CookiesProvider>, document.getElementById('root'));
