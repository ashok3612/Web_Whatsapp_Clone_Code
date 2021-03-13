import React, { useEffect, useRef, useState } from "react";
import "./MessageBody.css";
import { Message } from "./Message";
import { useSelector } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export function Messagebody(props) {
  const chats = useSelector((state) => state.chatState.chats);
  const [conversations, setConversations] = useState([]);
  const currentUser = useSelector((state) => state.userState.currentUser);
  let msgDiv = useRef();
  let [isSpin, setIsSpin] = useState(false);

  useEffect(() => {
    setConversations(chats);
    if (chats.length === 0) {
      setIsSpin(true);
    } else {
      setIsSpin(false);
    }
  }, [chats]);

  useEffect(() => {
    setIsSpin(true);
  }, [currentUser]);

  useEffect(() => {
    msgDiv.current.scrollTo(0, msgDiv.current.scrollHeight);
  });

  const setTimeOutVal = (time) => {
    setTimeout(() => setIsSpin(false), time);
    return;
  };

  const getFromOrTo = (conv) => {
    return conv.From === currentUser.googleId
      ? "Message__MessageRight"
      : "Message__MessageLeft";
  };
  return (
    <div id="All_Messages_Div" className="Message__Body" ref={msgDiv}>
      {console.log(isSpin)}
      {isSpin ? setTimeOutVal(2000) : ""}
      {isSpin ? (
        <Loader type="TailSpin" color="green" height={50} width={50} />
      ) : (
        ""
      )}
      {conversations.map((conv, key) => (
        <Message key={key} class={getFromOrTo(conv)} conv={conv} />
      ))}
    </div>
  );
}
