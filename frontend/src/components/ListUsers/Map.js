import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import styles from "./GoogleMapStyles.json";

const Map = ({
  googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1nvf5ES5KOcnyTJy8JKYPnL2wzmssyDE&v=3.exp&libraries=geometry,drawing,places",
  latitude,
  longitude,
  list: { list: users }
}) => {
  const [cookies] = useCookies(['userName']);


  function sendRequest(id) {
    axios.post('http://localhost:4000/database', {
      ID1: cookies.userName,
      ID2: id,
    });
  }
  /**
   * @withGoogleMap – функция для создания react-компонента. Предназначенного для отображения карты
   * GoogleMap – непосредственно сам компонент карты, в который передаются нужные параметры
   */

  // const ShowProfile = () => {
  //   setShowProfile(!isShowProfile);
  // };
  const CMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultOptions={{
          disableDefaultUI: true, // disable default map UI
          draggable: true, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: true, // allow scale controle
          scrollwheel: true, // allow scroll wheel
          styles // change default map styles
        }}
      >
        {props.children}
      </GoogleMap>
    ))
  );
  return (
    <>
      <CMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: "50%" }} />}
        containerElement={<div style={{ height: "700px" }} />}
        mapElement={
          <div
            style={{
              height: "45%",
              width: "55%",
              border: "2px solid #FFF",
              borderRadius: "25px",
              margin: "0 auto",
              boxShadow: "10px 10px 8px black"
            }}
          />
        }
        center={{ lat: latitude, lng: longitude }}
      >
        {users.map(el => (
          // onClick={() => {
          //  setShowProfile(!isShowProfile)
          // }}

          <div>
            <Modal
              trigger={
                <Marker
                  icon={{ url: "./imgs/cocktails.png" }}
                  position={{ lat: el.latitude, lng: el.longitude }}
                />
              }
            >
              {" "}
              <Modal.Header
                style={{ backgroundColor: "rgb(124, 42, 255)" }}
              ></Modal.Header>
              <Modal.Content image>
                {/* <Image wrapped size='medium' src='/images/wireframe/image.png' /> */}
                <Modal.Description>
                  <Header style={{ color: "rgb(124, 42, 255)" }}>
                    Name:
                    {` ${el.name}`}
                  </Header>
                  <li style={{ color: "rgb(124, 42, 255)" }}>
                    Date of Birth:
                    {` ${el.DoB}`}
                  </li>
                  <li style={{ color: "rgb(124, 42, 255)" }}>
                    Activity:
                    {` ${el.activity}`}
                  </li>
                  <li style={{ color: "rgb(124, 42, 255)" }}>
                    Favotite drinks:
                    {` ${el.drinks}`}
                  </li>
                  <li style={{ color: "rgb(124, 42, 255)" }}>
                    Favotite topics:
                    {` ${el.topics}`}
                  </li>
                  <li style={{ color: "rgb(124, 42, 255)" }}>
                    About yourself:
                    {` ${el.about}`}
                  </li>
                  {/* <Image src='/images/wireframe/paragraph.png' /> */}
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions style={{ backgroundColor: 'rgb(124, 42, 255)' }}>
                <Link
                  onClick={() => sendRequest(el._id)}
                  to={{
                    pathname: '/chat',
                    state: {
                      chats: (cookies.userName + el._id),
                    },
                  }}
                >
                  <Button

                    primary
                    style={{
                      color: '#0f4667',
                      textShadow: 'none',
                      margin: '0 auto',
                      borderRadius: '320px',
                      backgroundColor: '#FFF',
                    }}
                  >
                    Написать
                  </Button>

                </Link>
              </Modal.Actions>
            </Modal>
          </div>
        ))}
      </CMap>
    </>
  );
};

export default Map;
