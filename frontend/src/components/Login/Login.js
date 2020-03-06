import React, { useState, useEffect } from 'react';
import Slider from '../slider/Slider';
import Slider2 from '../slider/Slider2';
import './Login.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { LogIn } from '../../redux/action';

function Login(props) {
  const [error, setError] = useState('');
  const { user, LogIn } = props;
  const [cookies, setCookie] = useCookies(['userName']);

  const [slider, setSlider] = useState();
  useEffect(() => {
    const slider = (Math.floor(Math.random() * 10));
    setSlider(slider);
  }, []);

  function PutData(event) {
    event.preventDefault();
    const { mail: { value: email }, pasword: { value: password } } = event.target;
    axios.post('http://localhost:4000/users/login', {
      email,
      password,
    }).then((response) => {
      if (response.data.success) {
        if (response.data.profileId) {
          LogIn(response.data.id, response.data.nickname, response.data.profileId);
        } else {
          LogIn(response.data.id, response.data.nickname);
        }
        setCookie('userName', response.data.id);
      } else {
        setError(response.data.err);
        setTimeout(setError, 2000, '');
      }
    }).catch(() => { setError('Неизвестная Ошибка авторизации'); setTimeout(setError, 2000, ''); });
  }

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
              <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
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
  user: state,
});

const mapDispatchToProps = (dispatch) => ({
  LogIn: (id, nickname, profileId) => dispatch(LogIn(id, nickname, profileId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
