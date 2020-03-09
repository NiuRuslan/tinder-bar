import { LOGIN, LOGOUT, LOADER } from './action-types';

export const LogIn = (id, nickname, profileId) => ({
  type: LOGIN,
  id,
  nickname,
  profileId,
});

export const LogOut = () => ({
  type: LOGOUT,
});
export const setLoader = () => ({
  type: LOADER 
});

export default {
  LogIn,
  LogOut,
  setLoader
};
