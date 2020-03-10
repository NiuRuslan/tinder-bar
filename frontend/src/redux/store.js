import { createStore } from 'redux';
import reducer from './root-reducer';

// const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

// store.subscribe(() => {
//   localStorage.setItem('reduxState', JSON.stringify(store.getState()));
// });

export default createStore(
  reducer,
  // persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
