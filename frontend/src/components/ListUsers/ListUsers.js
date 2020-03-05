import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'




// const geoFindLocation = () => {
//   const status = document.querySelector('#status');
//   const mapLink = document.querySelector('#map-link');

//   mapLink.href = '';
//   mapLink.textContent = '';

//   function success(position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;

//     status.textContent = '';
//     mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//     mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
//   }

//   function error() {
//     status.textContent = 'Unable to retrieve your location';
//   }

//   if (!navigator.geolocation) {
//     status.textContent = 'Geolocation is not supported by your browser';
//   } else {
//     status.textContent = 'Locating…';
//     navigator.geolocation.getCurrentPosition(success, error);
//   }
// }



/**
 * Александр Иванов
 * Коомпонент отрисовывает список пользователей в заданном радиусе
 */
function ListUsers(props) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [radius, setRadius] = useState(null);
  const [list, setList] = useState(null);

  /**
   * Делает запрос на сервер:
   * @latitude - координата пользователя
   * @longitude - координата пользователя
   * @radius - размер радиуса поиска пользователей
   * Получает:
   * @success - флаг выполнения запроса
   * @list - список найденых пользователей
   * @err - Расшифровка ошибки
   */
  const requestListUsers = (latitude, longitude, radius) => {
    geoFindLocation();
    axios.post('/list/users', {
      latitude,
      longitude,
      radius,
    }).then((response) => {
      if (response.data.success) {
        setList({
          success: true,
          list: response.data.list,
        })
      } else {
        setList({
          success: false,
          err: '',
        })
      }
    }).catch(() => {
      setList({
        success: false,
        err: 'Runtime error',
      })
    })
  }

  const geoFindLocation = () => {
    const success = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }

    const error = () => {
      setList({
        success: false,
        err: 'Unable to retrieve your location',
      })
    }

    if (!navigator.geolocation) {
      setList({
        success: false,
        err: 'Geolocation is not supported by your browser',
      })
    } else {
      //status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }


  console.log('list>>', list);
  console.log('id>>', props.id);
  
  
  return (
    <React.Fragment>
      <h1>123</h1>
      <button id="find-me" onClick={() => requestListUsers()}>Show my location</button><br />
      {latitude}
      {/* <p id="status"></p>
      <Link id="map-link" target="_blank"></Link> */}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  login: state.login,
  id: state.id,
});

export default connect(mapStateToProps)(ListUsers)
