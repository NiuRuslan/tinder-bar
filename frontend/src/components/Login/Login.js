import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { requestFetchLogin } from "../../redux/action";
import Slider from "../slider/Slider";
import Slider2 from "../slider/Slider2";
import "./Login.css";

function Login(props) {
  const { user, err, requestFetchLogin } = props;
  const [cookies, setCookie] = useCookies(["userName", "userNickname"]);

  const [slider, setSlider] = useState();
  useEffect(() => {
    // setLoader()
    const slider = Math.floor(Math.random() * 10);
    // setLoader()
    setSlider(slider);
  }, []);

  function PutData(event) {
    event.preventDefault();
    const {
      mail: { value: email },
      pasword: { value: password }
    } = event.target;
    requestFetchLogin(email, password);
  }

  useEffect(() => {
    if (user.id) {
      setCookie("userName", user.id);
      setCookie("userNickname", user.nickname);
    }
  }, [user.id, setCookie]);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {slider > 5 ? <Slider /> : <Slider2 />}
      {cookies.userName ? (
        user.profileId ? (
          <Redirect from="/login" to="/" />
        ) : (
          <Redirect to="/profileCreator" />
        )
      ) : (
        <form
          onSubmit={PutData}
          className="login"
          style={{ alignSelf: "center" }}
        >
          <h1 className="segment">Login</h1>
          <label>
            <input
              name="mail"
              type="email"
              placeholder="Email Address"
              required
            />
          </label>
          <label>
            <input
              name="pasword"
              type="password"
              placeholder="Password"
              minLength="5"
              required
            />
          </label>
          <button
            className="red"
            type="submit"
            style={{
              color: "#FFF",
              backgroundColor: "rgb(124, 42, 255)",
              textShadow: "1px 1px 1px rgb(124, 42, 255)"
            }}
          >
            {" "}
            Sign in <Icon name="sign-in" />
          </button>
          <div style={{ color: "red", textAlign: "center" }}>{err.title}</div>
          <br />
          <Link to="/regist" style={{ width: "100%", alignSelf: "center" }}>
            <button
              className="red"
              type="submit"
              style={{
                color: "rgb(124, 42, 255)",
                backgroundColor: "#fff",
                textShadow: "none"
              }}
            >
              Sign up <Icon name="signup" />
            </button>
          </Link>
        </form>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  err: state.error
});
const mapDispatchToProps = dispatch => ({
  requestFetchLogin: (email, password) =>
    dispatch(requestFetchLogin(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
