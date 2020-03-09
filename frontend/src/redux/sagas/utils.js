import axios from "axios";

export const fetchLogin = (email,password,url = "http://localhost:4000/users/login") => {
 return axios.post(url, {
      email,
      password,
    }).then(({data})=>{return data})
};

export const fetchRegist = (nickname,email,password,url = 'http://localhost:4000/users/registration') => {
  return axios.post(url, {
    nickname,
    email,
    password,
  }).then(({data}) => {return data})
};
