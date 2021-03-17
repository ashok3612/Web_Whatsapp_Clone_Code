import React from "react";
import "./SidebarHeader.css";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { GoogleLogoutComp } from "../../screens/supports/GoogleLogoutComp";

export function Sidebarheader(props) {
  const img = props.img;
  const name = props.name;
  return (
    <React.Fragment>
      <div className="Sidebar__Header">
        <div className="Sidebar__HeaderAvatar">
          <Tooltip title={name} size="large">
            <Avatar alt="user Image" src={img} />
          </Tooltip>
        </div>
        <div id="login_logout" className="Logout__Button">
          <GoogleLogoutComp />
        </div>
        <div className="Sidebar__HeaderActionIcons">
          <Tooltip title="Sorry, Currently this item not in use">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
          </Tooltip>
          {/* <IconButton>
          <ChatIcon />
        </IconButton> */}
          <Tooltip title="Sorry, Currently this item not in use">
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </React.Fragment>
  );
}
