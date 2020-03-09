import React from 'react'
import './startPage.css'
import { Redirect } from 'react-router-dom';
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
    <>    
    <div id="nc-main" className="nc-main bg-cover bg-cc">

     <div className="startPage">
<div className="smallStartPage">

    <div className="full-wh">
    <div className="bg-animation">
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div id='stars4'></div>
      </div>
        </div>
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
            <button  type="submit" >Yes, Sure</button>
          </form>
          <form onSubmit={checkNo}>
            <button  type="submit" style={{color: "#FFF",backgroundColor: "transparent"}}>No</button>
          </form>
        </>
      }
</div>
    </div>
    </div>
    </div>
    </>
  )
}

export default StartPage
