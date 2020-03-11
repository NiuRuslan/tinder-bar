import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { database } from "../../firebase";
import "./chat.css";
function Chat(props) {
  const [cookies] = useCookies(["userName", "userNickname"]);
  const [nickname, setNickname] = useState("");
  const [style, setStyle] = useState(
    "talktext talk-bubble tri-right round btm-right-in"
  );

  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState({});
  const { chats } = props.location.state;
  const [chat, setChat] = useState(null);
  console.log(messages);

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
    if (e.key === "Enter") {
      chatRoom.push({
        nickname: cookies.userNickname,
        msg,
        dateDay: new Date().toLocaleTimeString(),
        dateTime: new Date().toLocaleDateString()
      });
      setMsg("");
    }
  };

  return (
    <>
      <div id="nc-main" className="nc-main bg-cover bg-cc">
        <div className="chatPage">
          <div className="smallChatPage">
            <div className="full-wh">
              <div className="bg-animation">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <div id="stars4" />
              </div>
            </div>
            <div>
              <div className="App">
                <div className="chat">
                  <div className="messages">
                    {Object.keys(messages).map(message => {
                      if (
                        messages[message]["nickname"] === cookies.userNickname
                      )
                        return (
                          <div
                            style={{ textAlign: "right" }}
                            className="message"
                          >
                            {" "}
                            <div
                              style={{
                                textAlign: "center"
                              }}
                            >
                              {messages[message]["dateDay"]}
                            </div>
                            <div style={{ textAlign: "center" }}>
                              {messages[message]["dateTime"]}
                            </div>
                            {/* <span id="me">
                              {messages[message]["nickname"]} :
                            </span> */}
                            <div
                              style={{ backgroundColor: "#fff" }}
                              className="aaa"
                              style={{ borderRadius: "5px" }}
                            >
                              {messages[message]["msg"]}
                            </div>
                          </div>
                        );
                      else
                        return (
                          <div
                            style={{ textAlign: "left" }}
                            className="message"
                          >
                            {/* <span id="sender">
                              {messages[message]["nickname"]} :
                            </span> */}
                            <div style={{ color: "#fff", backgroundColor: "" }}>
                              {messages[message]["msg"]}
                            </div>
                          </div>
                        );
                    })}
                  </div>
                  <input
                    placeholder="write here"
                    onChange={handleMsgChange}
                    onKeyDown={handleKeyDown}
                    value={msg}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
