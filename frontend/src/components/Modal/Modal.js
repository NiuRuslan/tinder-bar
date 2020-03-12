import React from 'react';
import './modal.css';
import {
  Button, Header, Modal, List,
} from 'semantic-ui-react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function ModalWindow(props) {
  const profile = props.obj;
  const age = Math.floor((new Date() - new Date(profile.DoB)) / (24 * 3600 * 365.25 * 1000));
  const [cookies] = useCookies(['userName']);
  function sendRequest() {
    axios.post('http://localhost:4000/database', {
      ID1: cookies.userName,
      ID2: profile.person,
    });
  }

  function getChatName(a, b) {
    if (a > b) {
      return (`${a}+${b}`);
    }
    return (`${b}+${a}`);
  }
  return (
    <div>
      <Modal
        style={{
          textAlign: 'center',
        }}
        dimmer="blurring"
        size="mini"
        trigger={(
          <Button
            style={{
              fontSize: '25px',
              listStyle: 'none',
              alignSelf: 'center',
              position: 'relative',
              border: 'solid 2px #E74C3C',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              flex: '1',
              color: '#FFF',
            }}
          >
            {profile.name}
          </Button>
        )}
      >
        <Modal.Header style={{ backgroundColor: '#0f4667' }}></Modal.Header>
        <Modal.Content>
          <Modal.Description style={{ color: '#0f4667' }}>
            <Header style={{ color: '#0f4667' }}>
              {` ${profile.name}, ${age}`}
            </Header>
            <div className="avatar cursor" style={{ backgroundImage: `url(${profile.url || './imgs/info.png'})` }} />
            <List><List.Item icon="briefcase" content={profile.activity} /></List>
            <List><List.Item icon="glass martini" content={profile.drinks} /></List>
            <List><List.Item icon="comments" content={profile.topics} /></List>
            <List><List.Item icon="info circle" content={profile.about} /></List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={{ backgroundColor: '#0f4667' }}>
          <Link
            onClick={sendRequest}
            to={{
              pathname: '/chat',
              state: {
                chats: getChatName(cookies.userName, profile.person),
                name: profile.name,
                url: profile.url,
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
  );
}

export default ModalWindow;
