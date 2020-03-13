import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import './button.css';
import { useCookies } from "react-cookie";

const ButtonChat = (props) => {
  const [cookies] = useCookies(["userName", "chacked"]);
  const { url, chats } = props;
  const {chat} = chats
  const [pic,setPic]=useState('')
  const date=chats.date.toLocaleTimeString()
  let friend;
if(chat.indexOf(cookies.userName)===0){
  friend=chat.slice(chat.indexOf('+')+1)
} else {
  friend=chat.slice(0,chat.indexOf('+'))
}

//ЭТО УБОЖЕСТВО НУЖНО ПЕРЕДЕЛАТЬ!!!!
useEffect(()=>{
    const image = storage
      .ref(`images/${friend}`)
      .getDownloadURL()
      .catch(e => console.log(e));
  setPic(image)
},[setPic])
  return (
    <>
      <div
        style={{
          width: '50%',
          border: 'solid 1px #aab8c2',
          alignSelf: 'center',
          borderRadius: '20px',
          padding: '10px',
          color: ' #fff',
          margin: ' 5px',
        }}
        className="chatButton"
      >
        <Link
          to={{
            pathname: '/chat',
            state: {
              chats: chat,
              friend:friend,
            },
          }}
          style={{ display: ' flex', outline: 'none' }}
        >
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${url})`,
              width: '100px',
              height: '100px',
              float: 'left',
            }}
          />
          {/* <img src={url} style={{ width: "200px" }} /> */}
          <div
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              marginLeft: '5%',
            }}
          >
            <div
              style={{
                padding: '15px 0 0 0',
                float: 'left',
                width: '220px',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '27px',
                marginBottom: '5px',
              }}
            >
              <strong>{chats.nickname}</strong> {/* кто последний написал */}
              <strong>{chats.lastMessage}</strong> {/* последнее сообщение */}
              <strong>{date} </strong>   {/* время сообщения */}
            </div>
            <div
              style={{
                fontWeight: '400',
                color: '#aab8c2',
                fontSize: '13px',
              }}
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default ButtonChat;
