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
  const [list, setList] = useState({
    success: false,
    err: '',
  });

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
  const requestListUsers = (id, latitude, longitude, radius) => {
    axios.post('/list/users', {
      id,
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
      requestListUsers(props.id, position.coords.latitude, position.coords.longitude, radius);
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
  console.log('list', list);
  
  return (
    <div>

    <div>
      <h1>{props.name}</h1>
      <input onChange={(event) => {setRadius(event.target.value)}}></input>
      <button id="find-me" onClick={() => geoFindLocation()}>Show my location</button><br />
      <ul>
        {list.success ? list.list.map(obj => {
          return <li key={obj._id}>{obj.name}</li>
        }) : ''}
      </ul>
    </div> 
    <Map />
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(ListUsers)

// list [
//   {
//     geolocation: { latitude: 55.734973, longitude: 37.619144 },
//     topics: [ 'swimming', 'singing' ],
//     drinks: [ 'beer' ],
//     _id: 5e62000f11ac59f32d8556e3,
//     name: 'Olyaa',
//     DoB: 1998-06-01T00:00:00.000Z,
//     activity: 'teacher',
//     about: 'playing',
//     person: 5e62000f11ac59f32d8556e3,
//     latitude: 55.734973,
//     longitude: 37.619144
//   },
//   {
//     geolocation: { latitude: 55.736879, longitude: 37.483627 },
//     topics: [ 'cooking', 'swimming' ],
//     drinks: [ 'winw' ],
//     _id: 5e62001011ac59f32d8556e5,
//     name: 'Sanya',
//     DoB: 1987-06-01T00:00:00.000Z,
//     activity: 'doctor',
//     about: 'dancing',
//     person: 5e62001011ac59f32d8556e5,
//     latitude: 55.734973,
//     longitude: 37.619144
//   }
// ]
