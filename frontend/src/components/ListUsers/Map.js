import React from 'react';
import {
  Button, Header, Modal, List,
} from 'semantic-ui-react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from 'react-google-maps';

import styles from './GoogleMapStyles.json';

const Map = ({
  googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD1nvf5ES5KOcnyTJy8JKYPnL2wzmssyDE&v=3.exp&libraries=geometry,drawing,places',
  latitude,
  longitude,
  list,
  radius,
}) => {
  const [cookies] = useCookies(['userName']);

  function sendRequest(id) {
    axios.post('http://localhost:4000/database', {
      ID1: cookies.userName,
      ID2: id,
    });
  }

  function getChatName(a, b) {
    if (a > b) {
      return (`${a}+${b}`);
    }
    return (`${b}+${a}`);
  }
  /**
   * @withGoogleMap – функция для создания react-компонента. Предназначенного для отображения карты
   * GoogleMap – непосредственно сам компонент карты, в который передаются нужные параметры
   */

  // const ShowProfile = () => {
  //   setShowProfile(!isShowProfile);
  // };
  const CMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultOptions={{
          disableDefaultUI: true, // disable default map UI
          draggable: true, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: true, // allow scale controle
          scrollwheel: true, // allow scroll wheel
          styles, // change default map styles
        }}
      >
        {props.children}
      </GoogleMap>
    )),
  );
  return (
    <>
      <CMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: '50%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={(
          <div
            style={{
              height: '95%',
              width: '85%',
              border: '2px solid #FFF',
              borderRadius: '25px',
              margin: '0 auto',
              boxShadow: '10px 10px 8px black',
            }}
          />
        )}
        center={{ lat: latitude, lng: longitude }}
      >
        <Circle
          center={{ lat: latitude, lng: longitude }}
          radius={+radius}
        />
        {list.list.map((profile) => (
          <div>
            <Modal
              style={{
                textAlign: 'center', height: 'auto',
              }}
              dimmer="blurring"
              size="mini"
              trigger={(
                <Marker
                  icon={{ url: './imgs/cocktails.png' }}
                  position={{ lat: profile.latitude, lng: profile.longitude }}
                  title={profile.name}
                />
              )}
            >
              <Modal.Content>
                <Modal.Description>
                  <Header style={{ color: '#0f4667', fontSize: 'x-large' }}>
                    {` ${profile.name}, ${Math.floor((new Date() - new Date(profile.DoB)) / (24 * 3600 * 365.25 * 1000))}`}
                  </Header>
                  <div className="avatar cursor" style={{ backgroundImage: `url(${profile.url || './imgs/info.png'})` }} />
                  <List style={{ padding: '0 3rem', fontSize: 'large' }}>
                    <List.Item icon="briefcase" content={profile.activity} />
                    <List.Item icon="glass martini" content={profile.drinks} />
                    <List.Item icon="comments" content={profile.topics} />
                    <List.Item icon="info circle" content={profile.about} />
                  </List>
                  {/* <Image src='/images/wireframe/paragraph.png' /> */}
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions style={{ backgroundColor: '#0f4667' }}>
                <Link onClick={() => sendRequest(profile._id)} to={{
                  pathname: `/chat`,
                  state: {
                    chats: getChatName(cookies.userName, profile._id),
                    name: profile.name,
                    url:profile.url,
                    friend:profile._id,
                  }
                }}>
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
