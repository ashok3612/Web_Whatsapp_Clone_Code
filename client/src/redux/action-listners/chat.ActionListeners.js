import axios from "axios";
import { apiURL } from "../../env_Variables/ENV_Constants";
import { makeChatsEmpty, putAllChats, userCommonError } from "../actions/chat.Actions";

export const getAllEndToEndChats = (endToEnd) => {
  return (dispatch) => {
    const getChatsURL = `${apiURL}/api/v1/chat/getChats`;
    const config = {
      "Content-Type": "application/json",
    };
    const data = {
      from: endToEnd.from,
      to: endToEnd.to,
    };

    axios
      .post(getChatsURL, data, config)
      .then((res) => {
        dispatch(putAllChats(res.data));
      })
      .catch((error) => {
        dispatch(userCommonError(error));
      });
  };
};

export const sendMessageToDb = (msgObj) => {
  return (dispatch) => {
    const handlerURL = `${apiURL}/api/v1/chat/saveChat`;
    const data = { ...msgObj };
    const config = {
      "Content-Type": "application/json",
    };

    axios
      .post(handlerURL, data, config)
      .then((res) => {
        if (res.data) {
          dispatch(getAllEndToEndChats(msgObj));
        }
      })
      .catch((error) => {
        dispatch(userCommonError(error));
      });
  };
};

export const getlastChat = async (Obj) => {
  let lastMsg = {};
  const URL = `${apiURL}/api/v1/chat/getLastChat`;
  const data = { ...Obj };
  const config = {
    "Content-Type": "application/json",
  };

  lastMsg = await axios
    .post(URL, data, config)
    .then((res) => res.data)
    .catch((error) => {});
  return lastMsg;
};


export const makeAllChatsEmpty = () => {
  return dispatch =>  dispatch(makeChatsEmpty());
};
