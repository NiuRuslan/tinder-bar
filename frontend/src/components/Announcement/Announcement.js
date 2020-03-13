import React, { useState, useEffect } from "react";
import Announcement from "react-announcement";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./announcement.css";
function AnnouncementMessage(props) {
  const [cookies] = useCookies(["userName"]);
  const { user } = props;
  const [man, setMan] = useState(null);
  function getChatName(a, b) {
    if (a > b) {
      return `${a}+${b}`;
    }
    return `${b}+${a}`;
  }
  useEffect(() => {
    if (user) {
      setMan(user);
      setTimeout(setMan, 10000, null);
    }
  }, [user]);
  const deleteAnnoun = () => {
    setMan(null);
  };
  return (
    <>
      {/* {user ? ( */}
      {man && (
        <>
          <Link
            to={{
              pathname: "/chat",
              state: {
                chats: getChatName(cookies.userName, user.friend),
                name: user.name,
                url: user.url,
                date: user.date
              }
            }}
          >
            <div className="mainContainer">
              <div className="message-container">
                <img className="image" scr={man.url}></img>
                <div className="nameAndDate">{man.name}</div>
                {/* <small>{user.date}</small> */}
              </div>
              {/* 
              <div
                to="/"
                className="exitbar"
                onClick={deleteAnnoun}
                style={{ position: "relative" }}
              >
                <img src="./imgs/stop.png" />
              </div> */}
            </div>
          </Link>
        </>
      )}
      {/*) : null}*/}
    </>
  );
}
export default AnnouncementMessage;
