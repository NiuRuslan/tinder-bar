import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { LogIn } from '../../redux/action'
import { useCookies } from 'react-cookie';

function Login(props) {
  const [error, setError] = useState('')
  const {user,LogIn } = props
  const [cookies, setCookie] = useCookies(['userName']);

  function PutData(event) {
    event.preventDefault();
    const { mail: { value: email }, pasword: { value: password } } = event.target;
    axios.post('http://localhost:4000/users/login', {
      email,
      password,
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data.date.profileId)
        if(response.data.date.profileId){
          LogIn(response.data.date.id, response.data.date.nickname, response.data.date.profileId, );
          setCookie('userName', 'sdckdsncn')
        }
        LogIn(response.data.date.id, response.data.date.nickname,response.data.date.profileId,);
        setCookie('userName', 'sdckdsncn')
      } else {
        setError(response.data.err)
        setTimeout(setError, 2000, '')
      }
    }).catch(() => { setError('Неизвестная Ошибка авторизации'); setTimeout(setError, 2000, '') })
  }


  return (
    <>
      {cookies.userName ?
      (user.profileId ?<Redirect from='/login' to='/home' />: <Redirect to='/profile'/> )
        
        : <div>
          <form onSubmit={PutData}>
           
              <h1 className="segment">Sign up</h1>
           

            <label>
              <input name='mail' type="email" placeholder="Email Address" required/>
            </label>
            <label>
              <input name='pasword' type="password" placeholder="Password" minLength='5' required/>
            </label>
            <button className="red" type="submit"><i className="icon ion-md-lock"></i> Log in</button>
            <br />
            <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
  <Link to='/regist'><button className="green">Create Account</button></Link>
          </form>
         
          
        </div>
      }

    </>
  )
}

const mapStateToProps = (state) => ({
user:state,
});

const mapDispatchToProps = (dispatch) => ({
  LogIn: (id, nickname,profileId ) => dispatch(LogIn(id, nickname,profileId))
});

export default connect(mapStateToProps,mapDispatchToProps)(Login)
