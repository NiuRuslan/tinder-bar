import React, { useState, useEffect } from 'react';
import Slider from '../slider/Slider';
import Slider2 from '../slider/Slider2';
import './Login.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { requestFetchLogin } from '../../redux/action';

function Login(props) {
  const { user, err, requestFetchLogin } = props;
  const [cookies, setCookie] = useCookies(['userName']);

  const [slider, setSlider] = useState();
  useEffect(() => {
    const slider = (Math.floor(Math.random() * 10));
    setSlider(slider);
  }, []);

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
      {slider > 5
        ? (<Slider />) : (<Slider2 />)}
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
              <button className="red" type="submit" style={{ color: '#FFF', backgroundColor: '#0f4667', textShadow: '1px 1px 1px #0f4667' }}> Log in</button>
              <div style={{ color: 'red', textAlign: 'center' }}>{err.title}</div>
              <br />
              <Link to="/regist" style={{ width: '100%', alignSelf: 'center' }}>
                <button className="green" style={{ color: '#0f4667', backgroundColor: '#FFF', textShadow: '1px 1px 1px #0f4667' }}>Create Account</button>
              </Link>

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
