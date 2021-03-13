import React, { useEffect, useRef, useState } from "react";
import "./MessageSender.css";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageToDb } from "../../redux/action-listners/chat.ActionListeners";

export function Messagesender(props) {
  const currentUser = useSelector((state) => state.userState.currentUser);
  const toUser = useSelector((state) => state.userState.toChatUser);
  let [message, setMessage] = useState("");
  const dispatcher = useDispatch();
  const inputMsgComp = useRef(null);
  
  useEffect(() => {
    inputMsgComp.current.focus();
  }, [toUser]);

  const submitConvHandler = (e) => {
    e.preventDefault();
    const chatObj = {
        from : currentUser.googleId,
        to : toUser.googleId,
        message : message.trim(),
        created_at : createdTimeHandler()
    };
    dispatcher(sendMessageToDb(chatObj));
    setMessage("");
    props.submithandler();
  };

  const createdTimeHandler = () => {
    return new Date().getTime();
  };

  return (
    <div className="Message__SenderMain">
      <div className="Message_SenderIcons">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton>
          <AttachmentIcon />
        </IconButton>
      </div>
      <div className="Message_SenderItem">
        <form onSubmit={(e) => submitConvHandler(e)}>
          <input
            value={message}
            ref={inputMsgComp}
            placeholder="Type something..."
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button type="submit" hidden></button>
        </form>
      </div>
      <div className="Message_SenderMic">
        <IconButton>
          <MicNoneIcon />
        </IconButton>
      </div>
    </div>
  );
}
