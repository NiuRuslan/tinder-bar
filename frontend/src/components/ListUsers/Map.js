import React, { Fragment } from "react";

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
  longitude
}) => {
  /**
   * @withGoogleMap – функция для создания react-компонента. Предназначенного для отображения карты
   * GoogleMap – непосредственно сам компонент карты, в который передаются нужные параметры
   */
  const CMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultOptions={{
          disableDefaultUI: true, // disable default map UI
          draggable: true, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: true, // allow scale controle
          scrollwheel: true, // allow scroll wheel
          styles: styles // change default map styles
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
        <Marker
          icon={{ url: "./imgs/cocktails.png" }}
          position={{ lat: latitude, lng: longitude }}
        />
      </CMap>
    </>
  );
};

export default Map;
