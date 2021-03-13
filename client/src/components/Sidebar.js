import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import { Sidebarheader } from "./sidebar_components/SidebarHeader";
import { Sidebarsearch } from "./sidebar_components/SidebarSearch";
import { Sidebaruserspanel } from "./sidebar_components/SidebarUsersPanel";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export function Sidebar(props) {
  const currentUser = useSelector((state) => state.userState.currentUser);
  const users = useSelector((state) => {
    let usersArr = [];
    if (state.userState !== undefined) usersArr = state.userState.Users;
    return usersArr;
  });
  let [finalUsers, setFinalUsers] = useState([]);
  let [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    if (users && currentUser) {
      const filteredUser = users.filter(
        (user) => user.googleId !== currentUser.googleId
      );
      setFinalUsers(filteredUser);
      setSearchedUsers(filteredUser);
    }
  }, [users]);

  const searchHandler = (searchValue) => {
    let searchedUsersList = finalUsers.filter((user) =>
      user.name.startsWith(searchValue)
    );
    setSearchedUsers(searchedUsersList);
  };

  return (
    <React.Fragment>
      <div className="Sidebar__Main">
        <Sidebarheader img={currentUser.imageUrl} />
        <Sidebarsearch searchHandler={searchHandler} />
        <Sidebaruserspanel
          users={searchedUsers}
          googleId={currentUser.googleId}
        />
      </div>
    </React.Fragment>
  );
}
