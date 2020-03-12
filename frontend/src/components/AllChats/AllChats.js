import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { storage } from "../../firebase";
import ButtonChat from "./ButtonChat";
import Navbar from "../navbar/Navbar";
import Loader from "../loader/Loader";
function AllChats() {
  const [cookies] = useCookies(["userName", "chacked"]);
  const [chats, setChat] = useState(null);
  const [urls, setUrl] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/database/${cookies.userName}`)
      .then(({ data }) => {
        data.chats.forEach(el => {
          let user;
          if (el.chat.indexOf(cookies.userName) === 0) {
            user = el.chat.slice(cookies.userName.length + 1);
          } else {
            user = el.chat.slice(0, cookies.userName.length);
          }
          storage
            .ref(`images/${user}`)
            .getDownloadURL()
            .then(url => {
              setUrl(urls.concat(url));
            });
        });
        setChat(data.chats);
      });
  }, [setChat]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh"
      }}
    >
      <div className="full-wh">
        <div className="bg-animation">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
          <div id="stars4" />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Navbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          {chats ? (
            chats.map((el, index) => {
              return <ButtonChat key={el._id} chats={el} url={urls[index]} />;
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default AllChats;
