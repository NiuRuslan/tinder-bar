import React, { useEffect } from 'react';
import './Login.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { requestFetchLogin } from '../../redux/action';

function Login(props) {
  const { user, err, requestFetchLogin } = props;
  const [cookies, setCookie] = useCookies(['userName']);

  function PutData(event) {
    event.preventDefault();
    const { mail: { value: email }, pasword: { value: password } } = event.target;
    requestFetchLogin(email, password)
    
  }

  useEffect(() => {
    if (user.id) {
      setCookie('userName', user.id)
    }
  }, [user.id, setCookie])

  return (
    <>
      {cookies.userName
        ? (user.profileId ? <Redirect from="/login" to="/listUsers" /> : <Redirect to="/profile" />)
        : (
          <div>
            <form onSubmit={PutData}>
              <h1 className="segment">Sign up</h1>
              <label>
                <input name="mail" type="email" placeholder="Email Address" required />
              </label>
              <label>
                <input name="pasword" type="password" placeholder="Password" minLength="5" required />
              </label>
              <button className="red" type="submit"> Log in </button>
              <br />
              <div style={{ color: 'red', textAlign: 'center' }}>{err.title}</div>
              <Link to="/regist"><button className="green">Create Account</button></Link>
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
  requestFetchLogin: (email, password) => dispatch(requestFetchLogin(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
