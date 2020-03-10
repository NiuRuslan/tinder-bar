import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Map from "./Map";
import ModalWindow from "../Modal/Modal";
import AnnouncementMessage from "../Announcement/Announcement";
import "./listUsers.css";
import Navbar from "../navbar/Navbar";
import "../snow/snow.css";
/**
 * Компонент List - отрисовывает список пользователей в заданном радиусе
 * @param {*} props
 */
const ListUsers = props => {
  // Инициализируем hooks
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongituse] = useState(null);
  const [radius, setRadius] = useState(null);
  const [list, setList] = useState({
    success: false,
    err: ""
  });
  const [isColorBtn, setColorBtn] = useState("findMe");

  const [isShowMap, setShowMap] = useState(false);
  /**
   * Обрабатывает переключатель - со списка на карту и обратно
   */
  const ChangeOnMap = () => {
    setShowMap(!isShowMap);
  };

  /**
   * Создает событие с типом LogOut
   * @param {event} e - событие
   */

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
      });
  };

  /**
   * Определяет координаты пользователя, используя Google map function
   */
  const geoFindLocation = () => {
    setColorBtn("");
    const success = position => {
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
  return (
    <div>
      <AnnouncementMessage />
      <div className="full-wh" style={{}}>
        <div className="bg-animation">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>
      </div>
      <div id="nc-main" className="nc-main bg-cover bg-cc">
        <div
          className="main-container"
          style={{
            width: "100%",
            height: "100vh"
          }}
        >
          <Navbar />
          <div className="input-form-userlist">
            <input
              className="inputFind"
              onChange={event => {
                setRadius(event.target.value);
              }}
              style={{
                display: "block",
                width: "50%",
                margin: "0 auto"
              }}
            ></input>
            <br />
            <button
              id="find-me"
              className={isColorBtn}
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
          </div>

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
            <Map
              latitude={latitude}
              longitude={longitude}
              list={list}
              style={{
                marginTop: "10%",
                alignSelf: "center",
                width: "100%",
                justifyContent: "center"
              }}
            />
          ) : (
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                padding: "0",
                justifyContent: "space-around",
                display: "flex",
                flexWrap: "wrap"
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
  );
};

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(ListUsers);
