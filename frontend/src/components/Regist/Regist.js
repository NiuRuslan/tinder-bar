import React, { useEffect } from 'react';
import './Regist.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { requestFetchRegist } from '../../redux/action';

function Regist(props) {
  const [cookies, setCookie] = useCookies(['userName']);
  const { requestFetchRegist,err,user } = props;


  function PutData(event) {
    event.preventDefault();
    const { nick: { value: nickname }, mail: { value: email }, pasword: { value: password } } = event.target;
    requestFetchRegist(nickname,email,password)
  }
  useEffect(()=>{
if(user.id){
  setCookie('userName', user.id)
}
  },[user.id,setCookie])


  return (
    <>
      {cookies.userName
        ? <Redirect to="/profile" />
        : (
          <div>
            <form onSubmit={PutData}>
              <h1 className="segment">Create Account</h1>
              <label>
                <input name="nick" type="text" placeholder="NickName" required />
              </label>
              <label>
                <input name="mail" type="email" placeholder="Email Address" required />
              </label>
              <label>
                <input name="pasword" type="password" placeholder="Password" minLength="5" required />
              </label>
              <div style={{ color: 'red', textAlign: 'center' }}>
                {err.title}
                {' '}
                <br />
                {' '}
              </div>
              <button className="red" type="submit">Create</button>
              <br />
              <Link to="/login"><button className="green">LogIn</button></Link>
            </form>
          </div>
        )}
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
  err: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  requestFetchRegist: (nickname,email, password) => dispatch(requestFetchRegist(nickname,email, password)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Regist);
