import { LOGIN, PROFILE_INIT, LOGOUT, LOADER} from './action-types';

const init = { id: "", nickname: "", profileId: "", isLoader: false };

export default (state = init, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: action.id,
        nickname: action.nickname,
        profileId: action.profileId
      };
      case PROFILE_INIT:
        return {
          ...state,
          profileId:action.profileId,
        }
    case LOADER:
      return {
        ...state,
        isLoader: !state.isLoader
      };
    case LOGOUT:
      return {
        ...state,
        id: '',
        nickname: '',
        profileId: '',
        isLoader: false,
      }
    default:
      return state;
  }
};
