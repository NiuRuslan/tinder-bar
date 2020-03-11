import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { storage } from '../../firebase'
import ButtonChat from './ButtonChat'


function AllChats() {
  const [cookies] = useCookies(['userName', 'chacked']);
  const [chat, setChat] = useState(null)
  const [url, setUrl] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/database/${cookies.userName}`).then(({ data }) => {
      let urls = []
      data.chats.forEach(el => {
        let user;
        if (el.indexOf(cookies.userName) === 0) {
          user = el.slice(cookies.userName.length+1)
        } else {
          user = el.slice(0, cookies.userName.length)
        }
        storage.ref(`images/${user}`).getDownloadURL().then((url) => {
          urls.push(url);
        });
      })
      setChat(data.chats)
      setUrl(urls)
    })
  })
  return (
    <>
      {
       chat.map((el, index) => {
         return(
         <>
         <ButtonChat chat={el} url={url[index]}/>
         </>
         )
        })
      }
    </>
  )
}

export default AllChats

