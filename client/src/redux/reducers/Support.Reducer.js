import { toast } from "react-toastify";
import { Constants } from "../Constants";

const initialUserState = {
  Friends: [],
};

export let supportReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case Constants.GET_USER_FRIENDS_SUCCESS:{
        state = {...state, Friends:[...action.payload]}
        break;
    }
    case Constants.GET_USER_FRIENDS_FAIL:{
        state = {...state, Friends:[]}
        break;
    }
    default: {
      state = { ...state };
    }
  }
  return state;
};
