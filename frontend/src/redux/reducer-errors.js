import { ERROR,CLEAR_ERROR } from './action-types';


const init = { error:false, title:''};

export default (state = init, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error:true,
        title:action.title
      };
      case CLEAR_ERROR:
      return {
        ...state,
        error:false,
        title:''
      };
    default:
      return state;
  }
};
