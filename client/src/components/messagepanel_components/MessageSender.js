import React, { useEffect, useRef, useState } from "react";
import "./MessageSender.css";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { IconButton, Tooltip } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageToDb } from "../../redux/action-listners/chat.ActionListeners";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import SendIcon from "@material-ui/icons/Send";

export function Messagesender(props) {
  const currentUser = useSelector((state) => state.userState.currentUser);
  const toUser = useSelector((state) => state.userState.toChatUser);
  let [message, setMessage] = useState("");
  const dispatcher = useDispatch();
  const inputMsgComp = useRef(null);
  let [ShowEmojiProps, setshowEmojiProps] = useState({});
  const wrapperRef = useRef(null);

  useEffect(() => {
    inputMsgComp.current.focus();
  }, [toUser]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        focusEventHandler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // useEffect(() => {
  //   if (ShowEmojiProps !== undefined && ShowEmojiProps.show) {
  //     document.getElementById("rmenu").style.position =
  //       "absolute";
  //     document.getElementById("rmenu").style.top =
  //       "-" + (430) + "px";
  //     document.getElementById("rmenu").style.left = "20px";
  //   }
  // }, [ShowEmojiProps]);

  const submitConvHandler = (e) => {
    e.preventDefault();
    const chatObj = {
      from: currentUser.googleId,
      to: toUser.googleId,
      message: message.trim(),
      created_at: createdTimeHandler(),
    };
    dispatcher(sendMessageToDb(chatObj));
    setMessage("");
    props.submithandler();
  };

  const createdTimeHandler = () => {
    return new Date().getTime();
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setMessage(message + emoji);
  };

  const focusEventHandler = () => {
    setshowEmojiProps({ show: false });
  };

  return (
    <div className="Message__SenderMain">
      <div className="Message_SenderIcons">
        <IconButton
          onClick={() => setshowEmojiProps({ show: !ShowEmojiProps.show })}
        >
          <InsertEmoticonIcon />
        </IconButton>
        {ShowEmojiProps.show ? (
          <span
            ref={wrapperRef}
            id="rmenu"
            style={{ position: "absolute", top: "-430px", left: "15px" }}
          >
            <Picker onSelect={addEmoji} />
          </span>
        ) : (
          ""
        )}
        <Tooltip title="Sorry, Currently this item not in use">
          <IconButton>
            <AttachmentIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="Message_SenderItem">
        <form onSubmit={(e) => submitConvHandler(e)}>
          <input
            value={message}
            ref={inputMsgComp}
            placeholder="Type something..."
            onChange={(e) => setMessage(e.target.value)}
            onFocus={focusEventHandler}
          ></input>
          <button type="submit" hidden></button>
        </form>
      </div>
      <div className="Message_SenderMic">
          <IconButton>
            {message.length === 0 ? (
              <Tooltip title="Sorry, Currently this item not in use"><MicNoneIcon /></Tooltip>
            ) : (
              <SendIcon style={{ color: "green" }} onClick={(e) => submitConvHandler(e) }/>
            )}
          </IconButton>
      </div>
    </div>
  );
}
