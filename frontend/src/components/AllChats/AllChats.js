import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import ButtonChat from "./ButtonChat";
import Navbar from "../navbar/Navbar";
import { database } from "../../firebase";
import Loader from "../loader/Loader";
function AllChats() {
  const [cookies] = useCookies(["userName", "chacked"]);
  const [chats, setChat] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/database/${cookies.userName}`)
      .then(async ({ data }) => {
        await Promise.all(data.chats.map(async el => {
          const snapshot = await database.ref(`${el.chat}`).limitToLast(1).once('value');
          snapshot.forEach(function (childSnapshot) {
            const { nickname, dateDay, dateTime, msg, date } = childSnapshot.val();
            el.date = date;
            el.nickname = nickname;
            el.lastMessage = msg;
          });
        }))
        data.chats.sort((a, b) => {
          return b.date - a.date
        })
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
              return <ButtonChat key={el._id} chats={el} />;
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
