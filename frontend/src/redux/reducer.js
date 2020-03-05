import {LOGIN, LOGOUT } from './action-types'

const init ={login:false};

export default (state=init, action) => {
switch (action.type){
  case LOGIN:
    return {
      ...state,
      login:!state.login
    }
    case LOGOUT:
    return {
      ...state,
      login:!state.login
    }
}
}
