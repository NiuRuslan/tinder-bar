import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Map from './Map';
import ModalWindow from '../Modal/Modal';
import './listUsers.css';
import Navbar from '../navbar/Navbar';
import '../snow/snow.css';
/**
 * Компонент List - отрисовывает список пользователей в заданном радиусе
 * @param {*} props
 */

const ListUsers = props => {
  const [cookies, setCookie] = useCookies(["userName"]);

  const [radius, setRadius] = useState(null);
  const [list, setList] = useState({
    success: false,
    err: '',
  });
  const [isColorBtn, setColorBtn] = useState('findMe');

  const [isShowMap, setShowMap] = useState(false);
  /**
   * Обрабатывает переключатель - со списка на карту и обратно
   */
  const ChangeOnMap = () => {
    setShowMap(!isShowMap);
  };
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongituse] = useState(null);

  /**
   * Делает запрос на сервер:
   * @param {String} id - пользователя в бд
   * @param {Number} latitude - широта в радинах
   * @param {Number} longitude - долгота в радианах
   * @param {Number} radius - радиус поиска
   */

  const requestListUsers = (id, latitude, longitude, radius) => {
    axios
      .post('http://localhost:4000/list/users', {
        id,
        latitude,
        longitude,
        radius,
      })
      .then((response) => {
        if (response.data.success) {
          // Задаем hooks
          setList({
            success: true,
            list: response.data.list,
          });
        } else {
          // Задаем hooks
          setList({
            success: false,
            err: response.data.err,
          });
        }
      })
      .catch(() => {
        setList({
          success: false,
          err: 'Runtime error',
        });
      });
  };

  /**
   * Определяет координаты пользователя, используя Google map function
   */
  const geoFindLocation = () => {
    setColorBtn('');
    const success = (position) => {
      // Задаем в hooks координаты
      setLatitude(position.coords.latitude);
      setLongituse(position.coords.longitude);
      // Делает запрос на сервер
      requestListUsers(
        cookies.userName,
        position.coords.latitude,
        position.coords.longitude,
        radius,
      );
    };
    // Обрабатываем ошибки getCurrentPosition
    const error = () => {
      // Задаем hooks
      setList({
        success: false,
        err: 'Unable to retrieve your location',
      });
    };

    if (!navigator.geolocation) {
      // Задаем hooks
      setList({
        success: false,
        err: 'Geolocation is not supported by your browser',
      });
    } else {
      /**
       * @param {function} success - определяет координаты пользователя
       * @param {function} error - возвращает ошибку обработки координат
       */
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return (
    <>
      <div className="full-wh" style={{}}>
        <div className="bg-animation">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
          <div id="stars4" />
        </div>
      </div>
      <div id="nc-main" className="nc-main bg-cover bg-cc">
        <div
          className="main-container"
          style={{
            width: '100%',
            height: '100vh',
          }}
        >
          <Navbar />
          <div className="input-form-userlist">
            <input
              className="inputFind"
              onChange={(event) => {
                setRadius(event.target.value);
              }}
              style={{
                display: 'block',
                width: '50%',
                margin: '0 auto',
              }}
            />
            <br />
            <button
              id="find-me"
              className={isColorBtn}
              onClick={() => geoFindLocation()}
              style={{
                display: 'block',
                color: '#FFF',
                backgroundColor: 'transparent',
                position: 'relative',
                margin: '0 auto',
                width: '25rem',
              }}
            >
              Show my location
            </button>
          </div>
          <br />
          {list.success ? (
            <div className="toggleBox" style={{ margin: '0 auto' }}>
              <input
                type="checkbox"
                name="toggle"
                className="sw"
                id="toggle-2"
              />
              <label htmlFor="toggle-2" onClick={ChangeOnMap}>
                <span>Use a map</span>
              </label>
            </div>
          ) : list.err
          }
          {isShowMap ? (
            <Map
              latitude={latitude}
              longitude={longitude}
              list={list}
              style={{
                marginTop: '10%',
                alignSelf: 'center',
                width: '100%',
                justifyContent: 'center',
              }}
            />
          ) : (
              <ul
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  padding: '0',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                }}
              >
                {list.success
                  ? list.list.map((obj) => <ModalWindow obj={obj} key={obj._id} />)
                  : list.err}
              </ul>
            )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(ListUsers);
