import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
// import './Login.css'
// import { Link, Redirect } from 'react-router-dom'
// import { LogIn } from '../../redux/action'


// function Login(props) {
//   const [error, setError] = useState('')
//   const { login, LogIn } = props




//   return (
//     <>
//       {login ?
//         <Redirect from='/login' to='/home' />
//         : <div>
//           <form onSubmit={PutData}>
//             <div className="segment">
//               <h1>Sign up</h1>
//             </div>

//             <label>
//               <input name='mail' type="email" placeholder="Email Address" required/>
//             </label>
//             <label>
//               <input name='pasword' type="password" placeholder="Password" minLength='5' required/>
//             </label>
//             <button className="red" type="submit"><i className="icon ion-md-lock"></i> Log in</button>
//             <br />
//             <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
//   <Link to='/regist'><button className="green">Create Account</button></Link>
//           </form>


//         </div>
//       }

//     </>
//   )
// }
/**
 * Александр Иванов
 * функция делает запрос на сервер и возвращает список участников
 */
const requestListUsers = () => {
  axios.post('/list/login').then((response) => {
    if (response.data.success) {
      console.log(response);
      //LogIn(response.data.date.id, response.data.date.nickname);
    } else {
      // setError(response.data.err)
      // setTimeout(setError, 2000, '')
    }
  }).catch(() => { 
    // setError('Неизвестная Ошибка регистрации'); 
    // setTimeout(setError, 2000, '') 
  })
}




/**
 * Александр Иванов
 * Коомпонент отрисовывает список зарегистрированных пользователей
 */
const listUsers = () => {
  //requestListUsers();
  return (
    <div>
      <h1>List Users</h1>
    </div>
  )
}


//   function PutData(event) {
//     event.preventDefault();
//     const { mail: { value: email }, pasword: { value: password } } = event.target;
//     axios.post('/users/login', {
//       email,
//       password,
//     }).then((response) => {
//       if (response.data.success) {
//         LogIn(response.data.date.id, response.data.date.nickname);
//       } else {
//         setError(response.data.err)
//         setTimeout(setError, 2000, '')
//       }
//     }).catch(() => { setError('Неизвестная Ошибка регистрации'); setTimeout(setError, 2000, '') })
//   }

const mapStateToProps = (state) => ({
  login: state.login,
});
// const mapDispatchToProps = (dispatch) => ({
//   LogIn: (id, nickname, ) => dispatch(LogIn(id, nickname))
// });

export default connect(mapStateToProps)(listUsers)
