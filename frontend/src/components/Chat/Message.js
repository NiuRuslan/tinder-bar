import React from "react";
import "./message.css";
import { useCookies } from "react-cookie";

function Message(props) {
  const [cookies] = useCookies(["userName", "userNickname"]);

  // key={messages[message]["dateTime"]} msg={messages[message]["msg"]} dateDay={messages[message]["dateDay"]}
  // dateTime={messages[message]["dateTime"]} nickname={messages[message]["nickname"]}

  const { msg, dateDay, dateTime, nickname, url } = props;
  console.log(url);

  return (
    <div className="body">
      <div className="chat">
        {cookies.userNickname === nickname ? (
          <>
            <div className="mine messages">
              <small style={{ color: " #fff", margin: "0 auto" }}>
                {dateTime}
              </small>
              <div className="message">{msg}</div>
            </div>
          </>
        ) : (
          <div className="yours messages">
            <small style={{ color: " #fff", margin: "0 auto" }}>
              {dateTime}
            </small>

            <div className="message"> {msg}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
