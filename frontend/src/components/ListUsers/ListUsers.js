import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Map from './Map'
import ModalWindow from "../Modal/Modal"
import LogOut from '../../redux/action'
import "./listUsers.css"

/**
 * Компонент List - отрисовывает список пользователей в заданном радиусе
 * @param {*} props 
 */
const ListUsers = (props) => {

  // Инициализируем hooks
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongituse] = useState(null);
  const [radius, setRadius] = useState(null);
  const [list, setList] = useState({
    success: false,
    err: ""
  });
  const [isShowMap, setShowMap] = useState(false);
  /**
   * Обрабатывает переключатель - со списка на карту и обратно
   */
  const ChangeOnMap = () => {
    setShowMap(!isShowMap)
  }
  /**
   * Создает событие с типом LogOut
   * @param {event} e - событие
   */
  const logoutAccaunt = e => {
    e.preventDefault();
    props.LogOut();
  };

  /**
   * Делает запрос на сервер:
   * @param {String} id - пользователя в бд
   * @param {Number} latitude - широта в радинах
   * @param {Number} longitude - долгота в радианах
   * @param {Number} radius - радиус поиска
   */
  const requestListUsers = (id, latitude, longitude, radius) => {
    axios
      .post("http://localhost:4000/list/users", {
        id,
        latitude,
        longitude,
        radius
      })
      .then(response => {
        if (response.data.success) {
          // Задаем hooks
          setList({
            success: true,
            list: response.data.list
          });
        } else {
          // Задаем hooks
          setList({
            success: false,
            err: ""
          });
        }
      })
      .catch(() => {
        // Задаем hooks
        setList({
          success: false,
          err: "Runtime error"
        });
      }
    }).catch(() => {
      // Задаем hooks
      setList({
        success: false,
        err: 'Runtime error',
      });
  };

  /**
   * Определяет координаты пользователя, используя Google map function
   */
  const geoFindLocation = () => {
    const success = (position) => {
      // Задаем в hooks координаты
      setLatitude(position.coords.latitude);
      setLongituse(position.coords.longitude);
      // Делает запрос на сервер
      requestListUsers(
        props.id,
        position.coords.latitude,
        position.coords.longitude,
        radius
      );
    };
    // Обрабатываем ошибки getCurrentPosition
    const error = () => {
      // Задаем hooks
      setList({
        success: false,
        err: "Unable to retrieve your location"
      });
    };

    if (!navigator.geolocation) {
      // Задаем hooks
      setList({
        success: false,
        err: "Geolocation is not supported by your browser"
      });
    } else {
      /**
       * @param {function} success - определяет координаты пользователя
       * @param {function} error - возвращает ошибку обработки координат
       */
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  console.log(list);
  return (
    <>
      <Navbar />
      <div
        id="nc-main"
        className="nc-main bg-cover bg-cc"
        style={{ display: "flex" }}
      >
        <div className="full-wh">
          <div className="bg-animation">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="stars4"></div>
          </div>
        </div>
        <div
          style={{
            marginTop: "5%",
            alignSelf: "center",
            width: "100%",
            height: "100%",
            justifyContent: "center"
          }}
        >
          <div>
            {/* <h1>{props.name}</h1> */}
            <input
              className="inputFind"
              onChange={event => {
                setRadius(event.target.value);
              }}
              style={{
                display: "block",
                width: "50%",
                position: "relative",
                margin: "0 auto"
              }}
            ></input>
            <br />
            <button
              id="find-me"
              onClick={() => geoFindLocation()}
              style={{
                display: "block",
                color: "#FFF",
                backgroundColor: "transparent",
                position: "relative",
                margin: "0 auto",
                width: "25rem"
              }}
            >
              Show my location
            </button>
            <br />
            {list.success ? (
              <div className="toggleBox" style={{ margin: "0 auto" }}>
                <input
                  type="checkbox"
                  name="toggle"
                  className="sw"
                  id="toggle-2"
                />
                <label for="toggle-2" onClick={ChangeOnMap}>
                  <span>Use a map</span>
                </label>
              </div>
            ) : (
              ""
            )}

            {isShowMap ? (
              <Map latitude={latitude} longitude={longitude} list={list} />
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center"
                }}
              >
                {list.success
                  ? list.list.map(obj => {
                      return <ModalWindow obj={obj} key={obj._id} />;
                    })
                  : ""}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  ...state
});

/**
 * createAction c типом LOGOUT
 */
const mapDispatchToProps = {
  LogOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
