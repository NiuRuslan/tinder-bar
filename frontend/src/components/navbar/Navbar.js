import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul style={{ padding: '0' }} className="list">
      <li className="listLi">
        <Link to="/profile">
          <img className="navbar" src="./navbar/user.png" />
        </Link>
      </li>
      <li className="listLi">
        <Link to="/">
          <img src="./navbar/pin.png" />
        </Link>
      </li>
      <li className="listLi">
        <Link to="/chat">
          {' '}
          <img src="./navbar/email.png" />
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
