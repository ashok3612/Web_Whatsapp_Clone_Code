import { Constants } from "../Constants";

export const getAllFriendsSuccess = (friends) => {
  return {
    type: Constants.GET_USER_FRIENDS_SUCCESS,
    payload: friends,
  };
};

export const getAllFriendsFail = () => {
  return {
    type: Constants.GET_USER_FRIENDS_FAIL,
  };
};
