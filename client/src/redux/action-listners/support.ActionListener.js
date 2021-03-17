import axios from "axios";
import { apiURL } from "../../env_Variables/ENV_Constants";
import {
  getAllFriendsFail,
  getAllFriendsSuccess,
} from "../actions/support.action";

export const getAllFriendsList = (currentUserId) => {
  return (dispatch) => {
    if(currentUserId === undefined) return;
    const getChatsURL = `${apiURL}/api/v1/support/getAllFriends`;
    const config = {
      "Content-Type": "application/json",
    };
    const data = {
      _id: currentUserId,
    };

    axios
      .post(getChatsURL, data, config)
      .then((res) => {
        dispatch(getAllFriendsSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getAllFriendsFail());
      });
  };
};

export const addFriendToList = (currentUserId, newFriend) => {
  return (dispatch) => {
    const getChatsURL = `${apiURL}/api/v1/support/addFriendToList`;
    const config = {
      "Content-Type": "application/json",
    };
    const data = {
      _id: currentUserId,
      newFriend: newFriend,
    };

    axios
      .post(getChatsURL, data, config)
      .then((res) => {
        dispatch(getAllFriendsList(currentUserId));
      })
      .catch((error) => {
        console.log("Failed to save User");
      });
  };
};
