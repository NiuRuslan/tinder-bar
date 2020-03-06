import React from 'react';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const Map = ({
  googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD1nvf5ES5KOcnyTJy8JKYPnL2wzmssyDE&v=3.exp&libraries=geometry,drawing,places',
  latitude,
  longitude,
}) => {
/**
 * @withGoogleMap – функция для создания react-компонента. Предназначенного для отображения карты
 * GoogleMap – непосредственно сам компонент карты, в который передаются нужные параметры
 */
  const CMap = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 55.753960, lng: 37.620393 }}
    >
      {props.children}
    </GoogleMap>
  )));

  return (
    <>
      <CMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: '50%' }} />}
        containerElement={<div style={{ height: '700px' }} />}
        mapElement={<div style={{ height: '50%' }} />}
        center={{ lat: latitude, lng: longitude }}
      >
        <Marker
          position={{ lat: latitude, lng: longitude }}
        />
      </CMap>
    </>
  );
};

export default Map;
