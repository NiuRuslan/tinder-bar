import React, { useState, useEffect } from 'react';

import './modal.css';


function Modal(props) {
  const { profile } = props;
  return (
    <>
      <ul className="profile">
        <img src={`${profile.avatar}.jpg`} />
        <h1>
          Name:
          {profile.name}
        </h1>
        <li className="list">
          Date of Birth:
          {profile.DoB}
        </li>
        <li className="list">
          Activity:
          {profile.activity}
        </li>
        <li className="list">
          Favotite drinks:
          {profile.drinks}
        </li>
        <li className="list">
          Favotite topics:
          {profile.topics}
        </li>
        <li className="list">
          About yourself:
          {profile.about}
        </li>
      </ul>
    </>
  );
}

export default Modal;
