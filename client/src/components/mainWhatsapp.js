import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllEndToEndChats } from "../redux/action-listners/chat.ActionListeners";
import { setStateBySessionData } from "../redux/action-listners/user.ActionListener";
import { changeToUser } from "../redux/actions/user.Actions";
import { Dummymessagepanel } from "./DummyMessagePanel";
import "./mainWhatsapp.css";
import { Messagepanel } from "./MessagePanel.js";
import { Sidebar } from "./Sidebar";
import io from "socket.io-client";
import { makeAutoScroll } from "..";
import { serverHostostName } from "../env_Variables/ENV_Constants";
import { spinnerContext } from "../App";
import { addFriendToList } from "../redux/action-listners/support.ActionListener";

export const ToUserContext = React.createContext({});

export function MainWhatsApp(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => {
    return state.userState.currentUser;
  });
  const toChatUser = useSelector((state) => state.userState.toChatUser);
  let fromUserId = currentUser ? currentUser.googleId : undefined;
  let toUserId = toChatUser ? toChatUser.googleId : undefined;
  const [didMount, setDidMount] = useState(false);
  const ENDPOINT = serverHostostName;
  const context = useContext(spinnerContext);
  context(false);
  const users = useSelector((state) => {
    let usersArr = [];
    if (state.supportState !== undefined) usersArr = state.supportState.Friends;
    return usersArr;
  });
  const Allusers = useSelector((state) => {
    return state.userState.Users;
  });
  let [newFriendOne, setNewFriendOne] = useState([]);
  let [toUserUpdator, setToUserUpdator] = useState("");

  useEffect(() => {
    setDidMount(true);

    const socket = io.connect(ENDPOINT);
    socket.on(
      "ResFromAPI",
      (data) => {
        setNewFriendOne((oldfrnd) => [...oldfrnd, data.from]);
        if (sessionStorage.getItem("chatWith")) {
          const ChatUsers = JSON.parse(sessionStorage.getItem("chatWith"));
          const from = ChatUsers.from;
          const to = ChatUsers.to;
          if (data.from === to && data.to === from) {
            dispatch(
              getAllEndToEndChats({
                from: data.from,
                to: data.to,
              })
            );
            makeAutoScroll("#All_Messages_Div", 2000);
          }
        }
      },
      [Allusers, users]
    );
    if (sessionStorage.getItem("loggedUser")) {
      let currentUserIns = JSON.parse(sessionStorage.getItem("loggedUser"));
      const succObj = {
        type: "Success",
        res: currentUserIns,
      };
      dispatch(setStateBySessionData(succObj));
    } else if (currentUser.googleId === undefined) {
      history.push("/login");
    }
    return () => setDidMount(false);
  }, []);

  useEffect(() => {
    if (newFriendOne[0] !== undefined) addfrindToList(newFriendOne[0]);
  }, [newFriendOne]);

  const toUserHandler = (val) => {
    setToUserUpdator(val);
    if(val !== "" && users.length !== 0){
    let toUser = users.filter((user) => user.googleId === val);
    console.log(toUser);
    dispatch(changeToUser(toUser[0]));
    if (currentUser.googleId !== undefined && val !== undefined) {
      fromUserId = currentUser.googleId;
      toUserId = val;

      const userObj = {
        from: fromUserId,
        to: toUserId,
      };
      sessionStorage.setItem("chatWith", JSON.stringify(userObj));
      dispatch(getAllEndToEndChats(userObj));
    }
  }
  };

  useEffect(() => {
    if (toUserUpdator !== "" && users.length !== 0)
      toUserHandler(toUserUpdator);
  }, [toUserUpdator, users]);

  if (!didMount) {
    return null;
  }

  const addfrindToList = (data) => {
    if (data === currentUser.googleId) return;
    let flag = true;
    users.forEach((user) => {
      if (data === user.googleId) flag = false;
    });
    const newFriend = Allusers.filter((user) => user.googleId === data);
    if (flag && newFriend) {
      dispatch(addFriendToList(currentUser.googleId, newFriend[0]));
    }
    setNewFriendOne([]);
  };

  return (
    <div className="Main">
      <div className="wApp_main">
        <ToUserContext.Provider value={toUserHandler}>
          <Sidebar></Sidebar>
          {toChatUser === undefined ||
          toChatUser.googleId === undefined ||
          toChatUser.googleId === currentUser.googleId ? (
            <Dummymessagepanel />
          ) : (
            <Messagepanel />
          )}
        </ToUserContext.Provider>
      </div>
    </div>
  );
}
