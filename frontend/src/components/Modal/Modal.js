import React from "react";
import "./modal.css";
import { Button, Header, Modal } from "semantic-ui-react";
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

function ModalWindow(props) {
  const profile = props.obj;
  const [cookies] = useCookies(['userName']);
  function sendRequest() {
    axios.post('http://localhost:4000/database', {
      ID1: cookies.userName,
      ID2: profile.person,
    })
  }

  function getChatName (a, b) {
    if (a > b) {
      return (a + '+' + b)
    } else {
      return (b + '+' + a)
    }
  }
  return (
    <div>
      <Modal
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
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='/images/wireframe/image.png' /> */}
          <Modal.Description>
            <Header style={{ color: '#0f4667' }}>
              Name:
              {` ${profile.name}`}
            </Header>
            <li style={{ color: '#0f4667' }}>
              Date of Birth:
              {` ${profile.DoB}`}
            </li>
            <li style={{ color: '#0f4667' }}>
              Activity:
              {` ${profile.activity}`}
            </li>
            <li style={{ color: '#0f4667' }}>
              Favotite drinks:
              {` ${profile.drinks}`}
            </li>
            <li style={{ color: '#0f4667' }}>
              Favotite topics:
              {` ${profile.topics}`}
            </li>
            <li style={{ color: '#0f4667' }}>
              About yourself:
              {` ${profile.about}`}
            </li>
            {/* <Image src='/images/wireframe/paragraph.png' /> */}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={{ backgroundColor: '#0f4667' }}>
          <Link onClick={sendRequest} to={{
            pathname: `/chat`,
            state: {
              chats: getChatName(cookies.userName, profile.person),
              name:profile.name,
              
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
  );
}

export default ModalWindow;
