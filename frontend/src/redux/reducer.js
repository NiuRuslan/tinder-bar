import {LOGIN } from './action-types'

const init ={id:'',nickname:''};

export default (state=init, action) => {
switch (action.type){
  case LOGIN:
    return {
      ...state,
      id:action.id,
      nickname:action.nickname,
    }
    default:
      return state;
}
}
