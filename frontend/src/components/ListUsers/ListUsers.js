import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Map from './Map';

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
        });
      } else {
        setList({
          success: false,
          err: '',
        });
      }
    }).catch(() => {
      setList({
        success: false,
        err: 'Runtime error',
      });
    });
  };

  const geoFindLocation = () => {
    const success = (position) => {
      setLatitude(position.coords.latitude);
      setLongituse(position.coords.longitude);
      requestListUsers(props.id, position.coords.latitude, position.coords.longitude, radius);
    };

    const error = () => {
      setList({
        success: false,
        err: 'Unable to retrieve your location',
      });
    };

    if (!navigator.geolocation) {
      setList({
        success: false,
        err: 'Geolocation is not supported by your browser',
      });
    } else {
      // status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  console.log('list', list);

  return (
    <div>
      <div>
        <h1>{props.name}</h1>
        <input onChange={(event) => { setRadius(event.target.value); }} />
        <button id="find-me" onClick={() => geoFindLocation()}>Show my location</button>
        <br />
        <ul>
          {list.success ? list.list.map((obj) => <li key={obj._id}>{obj.name}</li>) : ''}
        </ul>
      </div>
      <Map latitude={+latitude} longitude={+longitude} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(ListUsers);
