import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Map from './Map'
import ModalWindow from "../Modal/Modal"
import {Link} from "react-router-dom"
import Snow from "../snow/snow.css"
import "./listUsers.css"
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
  const [isShowMap, setShowMap] = useState(false);

  const ChangeOnMap = () => {
    setShowMap(!isShowMap)
  }
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
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <>
  
    <div id="nc-main" className="nc-main bg-cover bg-cc" >

<div className="full-wh">
<div className="bg-animation" >
  <div id='stars'></div>
  <div id='stars2'></div>
  <div id='stars3'></div>
  <div id='stars4'></div>
  </div>
    </div>
    <div style={{ width:"100%", marginTop: "2%", display: 'flex', flexDirection:'column', width: '100%', alignItems:'center'}}>
    <div style={{marginTop:"3%", width: '90%'}}>
    
      {/* <h1>{props.name}</h1> */}
      <input className="inputFind" onChange={(event) => {setRadius(event.target.value)}} style={{display:"block",width:"50%", position:"relative", margin:"0 auto"}}></input><br/>
      <button id="find-me" onClick={() => geoFindLocation()} style={{display:"block", color: "#FFF", backgroundColor: "transparent",  position:"relative", margin:"0 auto", width: '25rem' }}>Show my location</button><br />
      <div className="toggleBox" style={{margin: "0 auto"}}>
    
  <input type="checkbox" name="toggle" className="sw" id="toggle-2"/>
  <label for="toggle-2" onClick={ChangeOnMap}><span>Use a map</span>
  </label>

{isShowMap ? ( <Map latitude={latitude} longitude={longitude}/> ) : (   <ul style={{listStyle:"none", display: 'flex', flexDirection:'column', width: '100%', alignItems:'center'}}>
        {list.success ? list.list.map(obj => {
          return <ModalWindow obj={obj} 
        key={obj._id} />
        }) : ''}
      </ul>)}
  
    </div> 
   
    </div>
    </div>
</div>
</>
  );
};

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps)(ListUsers);
