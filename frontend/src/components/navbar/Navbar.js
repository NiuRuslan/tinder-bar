import React from "react";
import "./navbar.css";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = props => {
  // const [cookies, , removeCookie] = useCookies(["user"]);
  // const history = useHistory();

  // const LogOut = () => {
  //   console.log(history);
  //   debugger;
  //   removeCookie("userName");
  //   history.push("/login");
  // };

  return (
    <nav>
      <ul style={{ padding: "0" }} className="list">
        <li className="listLi">
          <Link to="/">
            <img className="navbar" src="./navbar/user.png"></img>
          </Link>
        </li>
        <li className="listLi">
          <Link to="/listUsers">
            <img src="./navbar/pin.png"></img>
          </Link>
        </li>

        <li className="listLi">
          <Link to="/login">
            {" "}
            <img src="./navbar/notification.png"></img>
          </Link>
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
