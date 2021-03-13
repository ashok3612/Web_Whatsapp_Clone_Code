import React, { useEffect, useState } from "react";
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

export const ToUserContext = React.createContext({});

export function MainWhatsApp(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => {
    return state.userState.currentUser;
  });
  const users = useSelector((state) => state.userState.Users);
  const toChatUser = useSelector((state) => state.userState.toChatUser);
  let fromUserId = currentUser.googleId;
  let toUserId = toChatUser.googleId;
  const [didMount, setDidMount] = useState(false);
  const ENDPOINT = serverHostostName;

  useEffect((fromUserId, toUserId) => {
    setDidMount(true);

    const socket = io.connect(ENDPOINT);
    socket.on("ResFromAPI", (data) => {
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
      } else {
        alert(
          "Sorry your browser doesn't support session Storage, Please enable to to enjoy whatsapp services..."
        );
      }
    },[]);

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

  if (!didMount) {
    return null;
  }

  const toUserHandler = (val) => {
    let toUser = users.filter((user) => user.googleId === val);
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
  };

  return (
    <div className="Main">
      <div className="wApp_main">
        <ToUserContext.Provider value={toUserHandler}>
          <Sidebar></Sidebar>
          {toChatUser.googleId === undefined ? (
            <Dummymessagepanel />
          ) : (
            <Messagepanel />
          )}
        </ToUserContext.Provider>
      </div>
    </div>
  );
}
