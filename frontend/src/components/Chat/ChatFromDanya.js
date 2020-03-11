import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { database } from "../../firebase";
import Message from './Message'

function Chat(props) {
  const [cookies] = useCookies(["userName", "userNickname"]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState({});
  const { chats , url , name} = props.location.state;
  const chatRoom = database.ref().child(`${chats}`);

  useEffect(() => {
    const handleNewMessages = snap => {
      if (snap.val()) setMessages(snap.val());
    };
    chatRoom.on("value", handleNewMessages);
    return () => {
      chatRoom.off("value", handleNewMessages);
    };
  }, [setMessages]);

  const handleMsgChange = e => setMsg(e.target.value);
  const handleKeyDown = e => {
    chatRoom.push({
      nickname: cookies.userNickname,
      msg,
      dateTime: new Date().toLocaleTimeString(),
      dateDay: new Date().toLocaleDateString(),
    });
    setMsg('');
  };
  return (
    <>

      <div className="windowqwe">
        <div className="headerqwe"><img className='imgqwe' src={url} />
          <h2>{name}</h2>
        </div>
        <div class="chats">
          <Message />
          {Object.keys(messages).map(message =>
            <>
              <Message key={messages[message]["dateTime"]} msg={messages[message]["msg"]} dateDay={messages[message]["dateDay"]}
                dateTime={messages[message]["dateTime"]} nickname={messages[message]["nickname"]}
              />
            </>
          )}
          <div class="new-chatqwe">
            <input type="text" id="message" placeholder="write here" onChange={handleMsgChange} value={msg} />
            <button id="send" onClick={handleKeyDown}>Send</button>
          </div>


        </div>


      </div>
    </>
  );
}
export default Chat;
