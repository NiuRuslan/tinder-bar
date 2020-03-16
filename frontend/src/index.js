import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import createSagaMiddleware from "redux-saga";
import { createStore, compose, applyMiddleware } from "redux";
import App from "./App";
import rootSaga from "./redux/sagas/sagas";
import rootReducer from "./redux/root-reducer";
import "./index.css";
const initialSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(initialSagaMiddleware))
);

initialSagaMiddleware.run(rootSaga);
ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />{" "}
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
