import React from "react";
import "./message.css";
import { useCookies } from "react-cookie";

function Message(props) {
  const [cookies] = useCookies(["userName", "userNickname"]);

  // key={messages[message]["dateTime"]} msg={messages[message]["msg"]} dateDay={messages[message]["dateDay"]}
  // dateTime={messages[message]["dateTime"]} nickname={messages[message]["nickname"]}

  const { msg, dateDay, dateTime, nickname } = props;

  return (
    <div className="body">
      <div className="chat">
        {cookies.userNickname === nickname ? (
          msg !== 0 && (
            <>
              <div>{dateTime}</div>
              <div className="mine messages">
                <div className="message">{msg}</div>
              </div>
            </>
          )
        ) : (
          <div className="yours messages">
            <div className="message">{msg}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
