import React,{useState} from 'react'
import './Regist.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {LogIn} from '../../redux/action'

function Regist() {
  const [error,setError] = useState('')


 function PutData(event){
   event.preventDefault();
   const {nick:{value:nickname},mail:{value:email},pasword:{value:password}} = event.target; 
 axios.post('http://localhost:4000/users/registration',{
  nickname,
  email,
  password,
 }).then((response)=>{


 }).catch((error)=>{})
 }


  return (
    <div>
      <form onSubmit={PutData}>
  <div className="segment">
    <h1>Create Account</h1>
  </div>
  
  <label>
    <input name='nick' type="text" placeholder="NickName"/>
  </label>
  <label>
    <input name='mail' type="email" placeholder="Email Address"/>
  </label>
  <label>
    <input name='pasword' type="password" placeholder="Password" minLength='5'/>
  </label>
  <button className="red" type="submit"><i className="icon ion-md-lock"></i>Create</button>
</form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  login: state.login,
});
const mapDispatchToProps = (dispatch) => ({
  LogIn: () => dispatch(LogIn())
});


export default connect()(Regist)
