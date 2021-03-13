import React, { useContext, useEffect, useState } from "react";
import "./SidebarUser.css";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ToUserContext } from "../mainWhatsapp";
import { useDispatch, useSelector } from "react-redux";
import { getlastChat, makeAllChatsEmpty } from "../../redux/action-listners/chat.ActionListeners";

export function Sidebaruser(props) {
  const googleId = props.user.googleId;
  const img = props.user.imageUrl;
  const name =
    props.user.name.length > 20
      ? `${props.user.name.slice(0, 20)} ...`
      : props.user.name;
  const isActive = props.active;
  const toUserContext = useContext(ToUserContext);
  const chats = useSelector((state) => state.chatState.chats);
  const currentUser = useSelector((state) => state.userState.currentUser);
  let [lastMsg, setLastMsg] = useState("");
  const dispatch = useDispatch();

  const lastMessageHandler = async () => {
    const messageObj = await getlastChat({
      from: currentUser.googleId,
      to: googleId,
    });
    if (messageObj.Message === undefined) {
      setLastMsg("No direct chat yet");
    } else {
      setLastMsg(
        messageObj.Message.length > 20
          ? `${messageObj.Message.slice(0, 30)} ...`
          : messageObj.Message
      );
    }
  };
  useEffect(() => {
    lastMessageHandler();
  }, [chats]);

  const userClickHandler = (id) => {
    dispatch(makeAllChatsEmpty());
    toUserContext(id);
  };

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(6.5),
      height: theme.spacing(6.5),
    },
  }));
  const classes = useStyles();

  return (
    <div
      className="Sidebar__IndUser"
      style={
        isActive
          ? { backgroundColor: "#eef2ed", border: "0.5px solid lightgrey" }
          : {}
      }
      onClick={() => userClickHandler(googleId)}
      value={googleId}
    >
      <div className="Sidebar__UserAvatar">
        <Avatar alt="Ashok" src={img} className={classes.large} />
      </div>
      <div className="Sidebar__UserDetail">
        <span className="Sidebar__Username">{name}</span>
        <p className="Sidebar__UserLastMessage">{lastMsg}</p>
      </div>
    </div>
  );
}
