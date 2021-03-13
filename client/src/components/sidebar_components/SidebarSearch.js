import React from "react";
import "./Sidebarsearch.css";
import SearchIcon from "@material-ui/icons/Search";

export function Sidebarsearch(props) {
  const searchTrigger = props.searchHandler;

  const searchChangeHandler = (e) => {
    searchTrigger(e.target.value.trim());
  }


  return (
    <React.Fragment>
      <div className="Sidebar_Search">
        <div className="Sidebar__SearchItems">
          <SearchIcon/>
          <input onChange={(e) => searchChangeHandler(e)} placeholder="Search or start new chat" ></input>
        </div>
      </div>
    </React.Fragment>
  );
}
