import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { storage } from '../../firebase'
import ButtonChat from './ButtonChat'


function AllChats() {
  const [cookies] = useCookies(['userName', 'chacked']);
  const [chats, setChat] = useState(null)
  const [urls, setUrl] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/database/${cookies.userName}`).then(({ data }) => {
      data.chats.forEach(el => {
        let user;
        if (el.chat.indexOf(cookies.userName) === 0) {
          user = el.chat.slice(cookies.userName.length+1)
        } else {
          user = el.chat.slice(0, cookies.userName.length)
        }
        storage.ref(`images/${user}`).getDownloadURL().then((url) => {
          setUrl(urls.concat(url))
        });
      })
      setChat(data.chats)
    })
  },[setChat])
  return (
    <>
      {chats ?
       chats.map((el, index) => {
         return(
         <>
         <ButtonChat key={el._id} chats={el} url={urls[index]}/>
         </>
         )
        }) : <h1>LOADING</h1>
      }
    </>
  )
}

export default AllChats

