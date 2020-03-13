import React, { useState, useEffect } from "react";
import Announcement from "react-announcement";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

import "./announcement.css";

function AnnouncementMessage(props) {
  const [cookies] = useCookies(['userName']);
  const { user } = props;
  const [man, setMan] = useState(null);
  function getChatName(a, b) {
    if (a > b) {
      return (`${a}+${b}`);
    }
    return (`${b}+${a}`);
  }
  useEffect(()=>{
setMan(user)
setTimeout(setMan,2000,null)
  },[setMan])

  return (
    <>
      {/* {user ? ( */}
      {
        man ?
          <>
            <Link to={{
              pathname: '/chat',
              state: {
                chats: getChatName(cookies.userName, user.friend),
                name: user.name,
                url: user.url,
                date:user.date,
              },
            }}>
              <div className="mainContainer">
                <div className="message-container">
                  <img className="image" scr={`${user.url}`}></img>
                  <div className="nameAndDate">{user.name}</div>
                  <small>{user.date}</small>
                </div>
                <Link to="/" className="exitbar">
                  <img src="./imgs/stop.png" />
                </Link>
              </div>
            </Link>
          </>
          : null
      }
      {/*) : null}*/}
    </>
  );
}
export default AnnouncementMessage;
