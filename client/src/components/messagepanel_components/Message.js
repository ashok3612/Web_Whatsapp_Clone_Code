import React from "react";
import "./Message.css";

export function Message(props) {
  const message = props.conv.Message;
  const timestamp = props.conv.Created_At;

  const timeHandler = (timeStamp) => {
    let timeString = new Date(parseInt(timeStamp)).toTimeString().slice(0, 5);
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? "AM" : "PM";
    timeString = `${h}.${timeString.substr(3, 3)} ${ampm}`;
    return timeString;
  };

  return (
    <div className="Message__TopDiv">
      <div className={props.class}>
        <font className="Message__TextMessage">{message}</font>
        <span className="Message__Time">{timeHandler(timestamp)}</span>
      </div>
    </div>
  );
}
