import React from 'react';
import axios from 'axios';
import {
  Button, Header, Modal, List, Card
} from 'semantic-ui-react';
import './modal.css';
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
          textAlign: 'center',  height: 'auto'
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
              backgroundColor: 'transparent',
              flex: '1',
              color: '#FFF',
            }}
          >
            <Card style={{ backgroundColor: 'transparent', border: 'solid 2px #f5505b', borderRadius: '8px', width: '200px' }}>
              <Card.Content>
                <div className="mini" style={{ backgroundImage: `url(${profile.url || './imgs/info.png'})` }} />
                <Card.Header textAlign='center'></Card.Header>
                <Card.Description style={{ color: 'white' }}>
                  {profile.name}, {age}
                </Card.Description>
              </Card.Content>
            </Card>
          </Button>

        )}
      >
        <Modal.Content>
          <Modal.Description style={{ color: '#0f4667' }}>
            <Header style={{ color: '#0f4667', fontSize: 'x-large' }}>
              {` ${profile.name}, ${age}`}
            </Header>
            <div className="avatar cursor" style={{ backgroundImage: `url(${profile.url || './imgs/info.png'})` }} />
            <List style={{ padding: '0 3rem', fontSize: 'large' }}>
              <List.Item icon="briefcase" content={profile.activity} />
              <List.Item icon="glass martini" content={profile.drinks} />
              <List.Item icon="comments" content={profile.topics} />
              <List.Item icon="info circle" content={profile.about} />
            </List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={{ backgroundColor: '#0f4667', textAlign:'center' }}>
          <Link onClick={sendRequest} to={{
            pathname: `/chat`,
            state: {
              chats: getChatName(cookies.userName, profile.person),
              name:profile.name,
              url:profile.url,
              friend:profile.person,
            }
          }}>
            <Button
              primary
              style={{
                color: '#0f4667',
                textShadow: 'none',
                marginBottom: '1em',
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
