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
 * Делает запрос на сервер:
 * @latitude - координата пользователя
 * @longitude - координата пользователя
 * @radius - размер радиуса поиска пользователей
 * Получает:
 * @success - флаг выполнения запроса
 * @list - список найденых пользователей
 * @err - Расшифровка ошибки
 */
const requestListUsers = (setError) => {
  axios.post('/list/users', {
    latitude: 0,
    longitude: 0,
    radius: 0,
  }).then((response) => {
    if (response.data.success) {
      console.log(response);
      //LogIn(response.data.date.id, response.data.date.nickname);
    } else {
      return {
        success: false,
        err: '',
      }
    }
  }).catch(() => {
    return {
      success: false,
      err: 'Runtime error',
    }
  })
}




/**
 * Александр Иванов
 * Коомпонент отрисовывает список пользователей в заданном радиусе
 */
const listUsers = () => {
  const list = requestListUsers();
  console.log("list>>>", list);
  
  return (
    <div>
      <h1>List Users</h1>
    </div>
  )
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(listUsers)
