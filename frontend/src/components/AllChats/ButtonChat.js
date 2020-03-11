import React from 'react'
import { Link } from 'react-router-dom'

const ButtonChat = (props) => {
  const { url, chat } = props
  console.log(url, ' dfdf f df fd  ', props)
  return (
    <>
      <Link to={{
        pathname: `/chat`,
        state: {
          chats: chat,
        }
      }}>
        <img src={url} />
        НАПИСАТЬ
                </Link>
    </>
  )
}



export default ButtonChat

