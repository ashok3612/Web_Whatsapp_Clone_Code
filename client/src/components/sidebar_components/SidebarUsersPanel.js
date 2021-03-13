import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sidebaruser } from "./SidebarUser";
import "./SidebarUsersPanel.css";

export function Sidebaruserspanel(props) {
  let users = [];
  if (props.users !== undefined) users = props.users;
  let [allUsers, setAllUsers] = useState([]);
  const toUser = useSelector(state => state.userState.toChatUser);
  
  useEffect(() => {
    setAllUsers(users);
  }, [toUser, users])

  return (
    <React.Fragment>
      <div className="Sidebar_UsersListPanel">
        {allUsers.map((user) => {
          return <Sidebaruser active={toUser.googleId === user.googleId} key={user.googleId} user={user} />;
        })}
      </div>
    </React.Fragment>
  );
}
