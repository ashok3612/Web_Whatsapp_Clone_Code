import React from "react";
import "./SidebarHeader.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { GoogleLogoutComp } from "../../screens/supports/GoogleLogoutComp";

export function Sidebarheader(props) {
  const img = props.img;
  return (
    <React.Fragment>
      <div className="Sidebar__Header">
        <div className="Sidebar__HeaderAvatar">
          <Avatar alt="Ashok" src={img} />
        </div>
        <div id="login_logout" className="Logout__Button">
          <GoogleLogoutComp />
        </div>
        <div className="Sidebar__HeaderActionIcons">
        <IconButton>
          <DonutLargeIcon />
        </IconButton>
        {/* <IconButton>
          <ChatIcon />
        </IconButton> */}
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
        </div>
      </div>
    </React.Fragment>
  );
}
