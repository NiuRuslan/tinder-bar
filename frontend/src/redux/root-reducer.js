import { combineReducers } from 'redux';
import reducer from './reducer';
import reducerError from './reducer-errors';


// Root reducer
export default combineReducers({
  user: reducer,
  error: reducerError,
}); // -> rootReducer
