import React, { useState, useEffect } from "react";
import Announcement from "react-announcement";
import { Link } from "react-router-dom";

import "./announcement.css";

function AnnouncementMessage(props) {
  const { user } = props;
  const { date, url, name } = user;
  return (
    <>
      {/* {user ? ( */}
      <Link to="">
        <div className="mainContainer">
          <div className="message-container">
            <img className="image" scr={`${url}`}></img>
            <div className="nameAndDate">{name}</div>
            <small>{date}</small>
          </div>
          <Link to="/" className="exitbar">
            <img src="./imgs/stop.png" />
          </Link>
        </div>
      </Link>
      {/*) : null}*/}
    </>
  );
}
export default AnnouncementMessage;
