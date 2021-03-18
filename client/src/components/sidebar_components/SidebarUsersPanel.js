import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sidebaruser } from "./SidebarUser";
import "./SidebarUsersPanel.css";
import { Fab, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PopupAdduser from "../Popup_AddUser";

export function Sidebaruserspanel(props) {
  let users = [];
  if (props.users !== undefined) users = props.users;
  let [allUsers, setAllUsers] = useState([]);
  const toUser = useSelector((state) => state.userState.toChatUser);
  let [isShowPopup, setIsShowPopup] = useState(false);

  useEffect(() => {
    setAllUsers(Oldusers => 
      {
        return [...users]
      });
  }, [toUser, users]);

  const onClickFABHandler = () => {
    setIsShowPopup(true);
  };

  const closePopHandler = () => {
    setIsShowPopup(false);
  };

  return (
    <React.Fragment>
      <div className="Sidebar_UsersListPanel">
        {allUsers.length !== 0 &&  toUser !== undefined ? allUsers.map((user) => {
          console.log(toUser, "===", user.googleId)
          return (
            <Sidebaruser
              active={toUser.googleId === user.googleId}
              key={user.googleId}
              user={user}
            />
          );
        }) : <span style={{top : "10px", position:"relative"}}> No friends found... Click Add button to begin chat with your first friend...😀</span>}
        <Tooltip title="Add new user to your friends list...">
          <Fab id="plus__Bar" onClick={() => onClickFABHandler()}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <PopupAdduser show={isShowPopup} closeHandler={closePopHandler} />
      </div>
    </React.Fragment>
  );
}
