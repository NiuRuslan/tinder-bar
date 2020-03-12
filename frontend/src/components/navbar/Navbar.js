import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul style={{ padding: '0' }} className="navlist">
      <li className="listLi">
        <Link to="/profile">
          <img className="navbar" src="./navbar/user.png" alt="Your profile" title="Your profile" />
        </Link>
      </li>
      <li className="listLi">
        <Link to="/">
          <img src="./navbar/pin.png" alt="Find buddy" title="Find buddy" />
        </Link>
      </li>
      <li className="listLi">
        <Link to="/allChats">
          {' '}
          <img src="./navbar/email.png" alt="Chatlist" title="Chatlist"  />
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
