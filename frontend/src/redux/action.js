import { LOGIN, LOGOUT } from './action-types';

export const LogIn = (id, nickname, profileId) => ({
  type: LOGIN,
  id,
  nickname,
  profileId,
});

export const LogOut = () => ({
  type: LOGOUT,
});


export default {
  LogIn,
  LogOut,
};
