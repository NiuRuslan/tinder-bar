import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';
import { requestFetchRegist } from '../../redux/action';
import Slider from '../slider/Slider';
import Slider2 from '../slider/Slider2';
import './Regist.css';


function Regist(props) {
  const [cookies, setCookie] = useCookies(['userName','userNickname']);
  const [slider, setSlider] = useState();
  useEffect(() => {
    const slider = Math.floor(Math.random() * 10);
    setSlider(slider);
  }, []);
  const { requestFetchRegist, err, user } = props;

  function PutData(event) {
    event.preventDefault();
    const {
      nick: { value: nickname },
      mail: { value: email },
      pasword: { value: password },
    } = event.target;
    requestFetchRegist(nickname, email, password);
  }
  useEffect(() => {
    if (user.id) {
      setCookie('userNickname',user.nickname)
      setCookie('userName', user.id);
    }
  }, [user.id, setCookie]);

  return (
    <>
      {' '}
      {slider > 5 ? <Slider /> : <Slider2 />}
      {cookies.userName ? (
        <Redirect to="/profilecreator" />
      ) : (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
          <form
            onSubmit={PutData}
            className="register"
            style={{ alignSelf: 'center' }}
          >
            <h1 className="segment">New Account</h1>
            <label>
              <input name="nick" type="text" placeholder="Nickname" required />
            </label>
            <label>
              <input
                name="mail"
                type="email"
                placeholder="Email Address"
                required
              />
            </label>
            <label>
              <input
                name="pasword"
                type="password"
                placeholder="Password"
                minLength="5"
                required
              />
            </label>
            <button
              type="submit"
              style={{
                color: '#FFF',
                backgroundColor: '#0f4667',
                textShadow: '1px 1px 1px #0f4667',
              }}
            >
              Create
              {' '}
              <Icon name="add user" />
            </button>
            <div style={{ color: 'red', textAlign: 'center' }}>{err.title}</div>
            <br />
            <Link to="/login" style={{ width: '100%', alignSelf: 'center' }}>
              <button
                className="green"
                style={{
                  color: '#0f4667',
                  backgroundColor: '#FFF',
                  textShadow: 'none',
                }}
              >
                Login
                {' '}
                <Icon name="sign-in" />
              </button>
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
  requestFetchRegist: (nickname, email, password) => dispatch(requestFetchRegist(nickname, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Regist);
