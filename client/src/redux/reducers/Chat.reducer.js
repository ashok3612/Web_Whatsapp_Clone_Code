import { toast } from "react-toastify";
import { Constants } from "../Constants";

let initialChatObj = {
    chats : []
}

export let chatReducer = (state = initialChatObj, action) => {
    switch(action.type){
        case Constants.GET_USER_CHATS_SUCCESS:{
            state = { ...state, chats : action.payload }
            break;
        }

        case Constants.MAKE_CHATS_EMPTY:{
            state = { ...state, chats : [] }
            break;
        }

        case Constants.COMMON_FAIL_USER:{
            toast.error(`OOPS, Something went wrong 😕, Cause : ${action.payload}`, {
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
        default:{
            state = {...state}
        }
    }
    return state;
}