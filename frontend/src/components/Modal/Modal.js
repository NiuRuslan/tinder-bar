import React from 'react';
import './modal.css';
import { Button, Header, Modal } from 'semantic-ui-react'


function ModalWindow(props) {
const profile = props.obj


  return (
    <div style={{display: "flex",  width: "50%", marginBottom: "20px", height:"70px"}}>
<Modal trigger={<Button style={{fontSize: "25px",listStyle:"none",alignSelf: "center",  position:"relative", border: "solid 2px #E74C3C",  borderRadius: "8px", backgroundColor: "transparent", flex: "1 1",  color: "#FFF"}}>{profile.name}</Button>}>
    <Modal.Header style={{backgroundColor: "#0f4667"}}></Modal.Header>
    <Modal.Content image >
      {/* <Image wrapped size='medium' src='/images/wireframe/image.png' /> */}
      <Modal.Description>
        <Header style={{color: "#0f4667"}} >Name:{" " + profile.name}</Header>
        <li style={{color: "#0f4667"}}>Date of Birth:{" " + profile.DoB}</li>
  <li style={{color: "#0f4667"}}>Activity:{" " + profile.activity}</li>
  <li style={{color: "#0f4667"}}>Favotite drinks:{" " + profile.drinks}</li>
  <li style={{color: "#0f4667"}}>Favotite topics:{" " + profile.topics}</li>
  <li style={{color: "#0f4667"}}>About yourself:{" " + profile.about}</li>
        {/* <Image src='/images/wireframe/paragraph.png' /> */}
    
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions style={{ backgroundColor: "#0f4667"}}>
      <Button primary style={{color:"#0f4667", textShadow: "none",  margin:"0 auto",  borderRadius: "320px", backgroundColor: "#FFF"}}>
        Send a request
      </Button>
    </Modal.Actions>
  </Modal>




    {/* <div id="modal">
    <div class="modal-content">
    <div class="header">
   <img src={`${profile.avatar}.jpg`}></img> 
      <h2>Name:{" " + profile.name}</h2>
    </div>
    <ul className="profile">
    <div class="copy">
    <li className="list">Date of Birth:{" " + profile.DoB}</li>
  <li className="list">Activity:{" " + profile.activity}</li>
  <li className="list">Favotite drinks:{" " + profile.drinks}</li>
  <li className="list">Favotite topics:{" " + profile.topics}</li>
  <li className="list">About yourself:{" " + profile.about}</li>
      <a href="/">Close Link</a> 
      </div>
      </ul> 
  </div>

  <div class="overlay"></div> 

</div> */}
  
</div>
  );
}

export default ModalWindow
