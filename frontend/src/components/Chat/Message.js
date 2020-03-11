import React from 'react'
import './message.css'
import { useCookies } from 'react-cookie';


function Message(props) {
  const [cookies] = useCookies(['userName', 'userNickname']);


  // key={messages[message]["dateTime"]} msg={messages[message]["msg"]} dateDay={messages[message]["dateDay"]} 
  // dateTime={messages[message]["dateTime"]} nickname={messages[message]["nickname"]}

  const {msg,dateDay,dateTime,nickname} = props;

  return (
<>

          {cookies.userNickname===nickname ? 
          <span className="u2 chatqwe">
          <small>{dateTime}</small><br/>
           {msg}
           </span>
           :
           <span className="u1 chatqwe">
           <small>{dateTime}</small><br/>
          {msg}
            </span>
        }
</>
  )
}

export default Message

