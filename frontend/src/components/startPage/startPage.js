import React, { useState } from 'react'
import './startPage.css'
import { Link, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';



function StartPage() {
  const [cookies, setCookie] = useCookies(['userName', 'chacked']);

  function checkYes(event) {
    event.preventDefault();
    setCookie('chacked', true)
  }
  function checkNo(event) {
    event.preventDefault();
    setCookie('chacked', false)
  }

  return (
    <div>
      {cookies.chacked ?
        (cookies.chacked === 'true' ?
          (cookies.userName ?
            <Redirect from='startpage' to='/home' />
            : <Redirect from='startpage' to='/login' />) :
          <h1 className="red">Sorry, you can't use this app</h1>
        ) :
        <>
          <h1 className='segment'>Are you 18+</h1>
          <form onSubmit={checkYes}>
            <button className="red" type="submit">Yes, Sure</button>
          </form>
          <form onSubmit={checkNo}>
            <button className="red" type="submit">No</button>
          </form>
        </>
      }

    </div>
  )
}

export default StartPage
