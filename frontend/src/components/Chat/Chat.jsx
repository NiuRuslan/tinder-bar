import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useCookies } from "react-cookie";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_API,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_DB_AppId,
  measurementId: process.env.REACT_APP_messagingSenderId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.database()


function Chat() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState({});

  const chatRoom = db.ref().child('chatrooms').child('global');
  const ref = db.ref().child('chatrooms').child('global');
  
  useEffect(() => {
    const handleNewMessages = snap => {
      if (snap.val()) setMessages(snap.val());
    }
    chatRoom.on('value', handleNewMessages);
    return () => {
      chatRoom.off('value', handleNewMessages);
    };
  });

  const handleNameChange = e => setNickname(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const handleClick = e => {
    db.ref().child('nicknames').push({
      nickname,
      email,
    });
    setJoined(true);
  };

  const handleMsgChange = e => setMsg(e.target.value);
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      chatRoom.push({
        sender: nickname,
        msg,
      });
      setMsg("");
    }
  };

  return (
    <div className="App">
      {!joined ? (
        <div className="joinForm">
          <input placeholder="Nickname" value={nickname} onChange={handleNameChange} /><br />
          <input placeholder="Email" value={email} onChange={handleEmailChange} /><br />
          <button onClick={handleClick}>Join</button>
        </div>
      ) : (
          <div className="chat">
            <div className="messages">
              {Object.keys(messages).map(message => {
                if (messages[message]["sender"] === nickname)
                  return (
                    <div className="message">
                      <span id="me">{messages[message]["sender"]} :</span><br />
                      {messages[message]["msg"]}
                    </div>
                  );
                else
                  return (
                    <div className="message">
                      <span id="sender">{messages[message]["sender"]} :</span><br />
                      {messages[message]["msg"]}
                    </div>
                  );
              })}
            </div>
            <input placeholder="msg" onChange={handleMsgChange} onKeyDown={handleKeyDown} value={msg} /><br />
          </div>
        )}
    </div>
  );
}

export default Chat;
