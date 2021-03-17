import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriendsList } from "../redux/action-listners/support.ActionListener";
import "./Sidebar.css";
import { Sidebarheader } from "./sidebar_components/SidebarHeader";
import { Sidebarsearch } from "./sidebar_components/SidebarSearch";
import { Sidebaruserspanel } from "./sidebar_components/SidebarUsersPanel";

export function Sidebar(props) {
  const currentUser = useSelector((state) => state.userState.currentUser);
  // const users = useSelector((state) => {
  //   let usersArr = [];
  //   if (state.userState !== undefined) usersArr = state.userState.Users;
  //   return usersArr;
  // });
  const users = useSelector((state) => {
    let usersArr = [];
    if (state.supportState !== undefined) usersArr = state.supportState.Friends;
    return usersArr;
  });
  let [finalUsers, setFinalUsers] = useState([]);
  let [searchedUsers, setSearchedUsers] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    if (users && currentUser) {
      const filteredUser = users.filter(
        (user) => user.googleId !== currentUser.googleId
      );
      setFinalUsers(filteredUser);
      setSearchedUsers(filteredUser);
    }
  }, [users, currentUser]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllFriendsList(currentUser.googleId));
    }
  }, [currentUser]);

  const searchHandler = (searchValue) => {
    let searchedUsersList = finalUsers.filter((user) =>
      user.name.startsWith(searchValue)
    );
    setSearchedUsers(searchedUsersList);
  };

  return (
    <React.Fragment>
      <div className="Sidebar__Main">
        <Sidebarheader img={currentUser.imageUrl} name={currentUser.name}/>
        <Sidebarsearch searchHandler={searchHandler} />
        <Sidebaruserspanel
          users={searchedUsers}
          googleId={currentUser.googleId}
        />
      </div>
    </React.Fragment>
  );
}
