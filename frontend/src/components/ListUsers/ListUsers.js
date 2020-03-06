import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { MyMapComponent } from './Map'
import Map from './Map'


/**
 * Александр Иванов
 * Коомпонент отрисовывает список пользователей в заданном радиусе
 */
const ListUsers = (props) => {
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
      requestListUsers(position.coords.latitude, position.coords.longitude, radius);
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

  return (
    <div>

      <div>
        <h1>123</h1>
        <input onChange={(event) => { setRadius(event.target.value) }}></input>
        <button id="find-me" onClick={() => geoFindLocation()}>Show my location</button><br />
      </div>
      <Map />
    </div>
  );
}

  const mapStateToProps = (state) => ({
    login: state.login,
    id: state.id,
  });

export default connect(mapStateToProps)(ListUsers)
