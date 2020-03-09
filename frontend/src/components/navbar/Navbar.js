import React from "react";
import "./navbar.css";

import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, , removeCookie] = useCookies(["user"]);
  const history = useHistory();

  const LogOut = event => {
    // event.preventDefault();
    removeCookie("user");
    history.push("/login");
  };

  return (
    <nav className="list">
      <ul className="list">
        <li className="listLi">
          <img className="navbar" src="./navbar/user.png">
            {/* <Link to="/"> Main Page</Link> */}
          </img>
        </li>
        <li>
          <img src="./navbar/pin.png"></img>
        </li>
        <li>
          <img src="./navbar/exit-door.png"></img>
        </li>
      </ul>
    </nav>
  );
};
{
  /* {cookies.user ? (
            <Link onClick={event => LogOut(event)}>Logout </Link>
          ) : (
            <Link to="/login"> Login</Link>
          )} */
}
export default Navbar;
