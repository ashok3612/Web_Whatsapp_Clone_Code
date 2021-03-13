import { Constants } from "../Constants";

export const putAllChats = (chats) => {
  return {
    type: Constants.GET_USER_CHATS_SUCCESS,
    payload: chats,
  };
};
export const makeChatsEmpty = () => {
  return {
    type: Constants.MAKE_CHATS_EMPTY,
  };
};

export const userCommonError = (error) => {
    return {
        type : Constants.COMMON_FAIL_USER,
        payload : error
    }
}
