import React from "react";
import "./MessageHeader.css";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSelector } from "react-redux";

export function Messageheader(props) {
  const toChatUser = useSelector((state) => state.userState.toChatUser);

  const img = toChatUser.imageUrl;
  const name =
    toChatUser.name.length > 15
      ? `${toChatUser.name.slice(0, 15)} ...`
      : toChatUser.name;

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(6.5),
      height: theme.spacing(6.5),
    },
  }));

  const classes = useStyles();

  return (
    <div className="Message__Header">
      <div className="Message__HeaderLeft">
        <div className="Message__HeaderAvatar">
          <Avatar alt="Ashok" src={img} className={classes.large} />
        </div>
        <div className="Message__HeaderUserDetail">
          <span className="Message__Username">{name}</span>
          <p className="Message__UserLastSeen">online</p>
        </div>
      </div>
      <div className="Message__HeaderRight">
        <div className="Message_HeaderRightIcons">
          <Tooltip title="Sorry, Currently this item not in use">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sorry, Currently this item not in use">
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
