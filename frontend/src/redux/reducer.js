import {LOGIN } from './action-types'

const init ={id:'',nickname:'',profildId:'',};

export default (state=init, action) => {
switch (action.type){
  case LOGIN:
    return {
      ...state,
      id:action.id,
      nickname:action.nickname,
      profildId:action.profildId
    }
    default:
      return state;
}
}
