import React, { useState, useEffect } from 'react';
import Slider from '../slider/Slider';
import Slider2 from '../slider/Slider2';
import './Regist.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LogIn } from '../../redux/action';

function Regist(props) {
  const [cookies, setCookie] = useCookies(['userName']);
  const [error, setError] = useState('');
  const { LogIn } = props;
  const [slider, setSlider] = useState();
  useEffect(() => {
    const slider = (Math.floor(Math.random() * 10));
    setSlider(slider);
  }, []);

  function PutData(event) {
    event.preventDefault();
    const { nick: { value: nickname }, mail: { value: email }, pasword: { value: password } } = event.target;
    axios.post('http://localhost:4000/users/registration', {
      nickname,
      email,
      password,
    }).then((response) => {
      if (response.data.success) {
        LogIn(response.data.id, nickname);
        setCookie('userName', response.data.id);
      } else {
        setError(response.data.err);
        setTimeout(setError, 2000, '');
      }
    }).catch(() => { setError('Неизвестная Ошибка регистрации'); setTimeout(setError, 2000, ''); });
  }


  return (

    <>
      {' '}
      {slider > 5
        ? (<Slider />) : (<Slider2 />)}
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
              <button type="submit" style={{ color: '#FFF', backgroundColor: '#0f4667', textShadow: '1px 1px 1px #0f4667' }}>Create</button>
              <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
              <br />
              <Link to="/login" style={{ width: '100%', alignSelf: 'center' }}><button className="green" style={{ color: '#0f4667', backgroundColor: '#FFF', textShadow: '1px 1px 1px #0f4667' }}>LogIn</button></Link>

            </form>
          </div>
        )}
    </>
  );
}


const mapDispatchToProps = (dispatch) => ({
  LogIn: (id, nickname, profileId) => dispatch(LogIn(id, nickname, profileId)),
});


export default connect(null, mapDispatchToProps)(Regist);
