import React, { useState, useEffect } from 'react';
import {database} from '../../firebase';
import { useCookies } from "react-cookie";


function Chat() {
  const [cookies] = useCookies(['userName'])
  const [nickname, setNickname] = useState("");
  const [joined, setJoined] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState({});

  const chatRoom = database.ref().child(`${cookies.userName}`);

  useEffect(() => {

    const handleNewMessages = snap => {
      if (snap.val()) setMessages(snap.val());
    };
    chatRoom.on('value', handleNewMessages);
    return () => {
      chatRoom.off('value', handleNewMessages);
    };
  });

  const handleNameChange = e => setNickname(e.target.value);
  const handleClick = e => {
    database.ref().child('nicknames').push({
      nickname,
    });
    setJoined(true);
  };

  const handleMsgChange = (e) => setMsg(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      chatRoom.push({
        sender: nickname,
        msg,
      });
      setMsg('');
    }
  };

  return (
    <div className="App">
      {!joined ? (
        <div className="joinForm">
          <input placeholder="Nickname" value={nickname} onChange={handleNameChange} /><br />
          <button onClick={handleClick}>Join</button>
        </div>
      ) : (
        <div className="chat">
          <div className="messages">
            {Object.keys(messages).map((message) => {
              if (messages[message].sender === nickname) {
                return (
                  <div className="message">
                    <span id="me">
                      {messages[message].sender}
                      {' '}
                      :
                    </span>
                    <br />
                    {messages[message].msg}
                  </div>
                );
              }
              return (
                <div className="message">
                  <span id="sender">
                    {messages[message].sender}
                    {' '}
                    :
                  </span>
                  <br />
                  {messages[message].msg}
                </div>
              );
            })}
          </div>
          <input placeholder="msg" onChange={handleMsgChange} onKeyDown={handleKeyDown} value={msg} />
          <br />
        </div>
      )}
    </div>
  );
}

export default Chat;
