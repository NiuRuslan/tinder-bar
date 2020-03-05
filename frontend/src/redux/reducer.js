import {LOGIN, LOGOUT } from './action-types'

const init ={id:'',nickname:'',login:false};

export default (state=init, action) => {
switch (action.type){
  case LOGIN:
    return {
      ...state,
      id:action.id,
      nickname:action.nickname,
      login:!state.login,
    }
    case LOGOUT:
    return {
      ...state,
      login:!state.login,
    }
    default:
      return state;
}
}
