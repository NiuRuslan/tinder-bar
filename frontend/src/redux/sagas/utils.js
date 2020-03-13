import axios from 'axios';

export const fetchLogin = (email, password, url = '/users/login') => axios.post(url, {
  email,
  password,
}).then(({ data }) => data);

export const fetchRegist = (nickname, email, password, url = '/users/registration') => axios.post(url, {
  nickname,
  email,
  password,
}).then(({ data }) => data);
