import React from 'react'
import './Login.css'
import axios from 'axios'

function Login() {


  function PutData(event){
    event.preventDefault();
    const {mail:{value:email},pasword:{value:password}} = event.target; 
  axios.post('http://localhost:4000/users/Login',{
   email,
   password,
  }).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
  }


  return (
    <div>
      <form onSubmit={PutData}>
  <div className="segment">
    <h1>Sign up</h1>
  </div>
  
  <label>
    <input name='mail' type="email" placeholder="Email Address"/>
  </label>
  <label>
    <input name='pasword' type="password" placeholder="Password" minLength='5'/>
  </label>
  <button className="red" type="submit"><i className="icon ion-md-lock"></i> Log in</button>
  
</form>
    </div>
  )
}

export default Login
