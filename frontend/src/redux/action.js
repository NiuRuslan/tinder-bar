import { LOGIN, LOGOUT,REQUEST_FETCH_LOGIN,ERROR,CLEAR_ERROR,REQUEST_FETCH_REGIST, PROFILE_INIT,LOADER } from './action-types';

export const LogIn = (id, nickname, profileId, success) => ({
  type: LOGIN,
  id,
  nickname,
  profileId,
  success
});

export const requestFetchRegist = (nickname, email, password) => ({
  type: REQUEST_FETCH_REGIST,
  nickname,
  email,
  password
});

/**
 * createAction 
 * чистим localStorage c именем reduxState
 * и инициируем action с типом LOGOUT
 */
export const LogOut = () => {
  localStorage.removeItem('reduxState');
  return {
    type: LOGOUT,
  }
};

export const profileInit = (profileId) =>({
  type:PROFILE_INIT,
  profileId
})

export const setLoader = () => ({
  type: LOADER
});

export const error = title => ({
  type: ERROR,
  title
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const requestFetchLogin = (email, password) => ({
  type: REQUEST_FETCH_LOGIN,
  email,
  password
});
export default {
  LogIn,
  LogOut,
  setLoader,
  requestFetchLogin,
  clearError,
  error,
  requestFetchRegist
};
