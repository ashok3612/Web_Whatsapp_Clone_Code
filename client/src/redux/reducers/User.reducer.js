import { toast } from "react-toastify";
import { Constants } from "../Constants";

const initialUserState = {
  Users: [],
  currentUser: {},
  toChatUser: {},
  registerStatus: false,
  error: "",
};

export let userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case Constants.USER_LOGGED_IN: {
      state = {
        ...state,
        Users: action.payload.users,
        currentUser: action.payload.currentUser,
        toChatUser: {},
        error: "",
      };
      break;
    }
    case Constants.USER_LOGGED_IN_FAIL: {
      state = { ...initialUserState, error: action.payload };
      break;
    }
    case Constants.USER_LOGGED_OUT: {
      sessionStorage.clear();
      if (state.currentUser.name === undefined) {
        toast.error(`OOPS, No user logged In 😕`, {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      }
      state = initialUserState;
      toast.success(`Successfully Logged out from Whatsapp 👋`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    }

    case Constants.USER_REGISTER_SUCCESS: {
      toast.success(`Registration Successful 😀, Login to Continue...`, {
        position: "bottom-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      state = {
        ...state,
        registerStatus : true
      }
      break;
    }

    case Constants.REGISTER_END: {
      state = {
        ...state,
        registerStatus : false
      }
      break;
    }
    case Constants.CHANGE_TO_USER: {
      state = { ...state, toChatUser: action.payload, error: "" };
      break;
    }
    case Constants.COMMON_FAIL: {
      state = { ...state, error: action.payload };
      toast.error(`OOPS, Internal server Error 😕 : ${action.payload}`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    }
    default: {
      state = { ...state };
    }
  }
  return state;
};
