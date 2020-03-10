import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { profileInit } from "../../redux/action";
import { storage } from "../../firebase";
import "../snow/snow.css";
import "./profileEdit.css";
function ProfileEdit(props) {
  const [upload, setUpload] = useState(false);

  const [cookies, setCookie, removeCookies] = useCookies(["userName"]);
  const [activity, setActivity] = useState("");
  const [drinks, setDrinks] = useState("");
  const [topics, setTopics] = useState("");
  const [about, setAbout] = useState("");
  const [url, setUrl] = useState(null);
  const [save, setSave] = useState("");
  const id = cookies.userName;
  const { profileInit } = props;
  const [image, setImage] = useState(null);

  function patchData(event) {
    event.preventDefault();

    const uploadTask = storage.ref(`images/${cookies.userName}`).put(image);
    uploadTask.on("state_changed", undefined, undefined, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        setUrl(url);
      });
    });
    if (setUrl !== null || setUrl == null) {
      axios
        .patch("http://localhost:4000/users/profile", {
          activity,
          drinks,
          topics,
          about,
          id
        })
        .then(({ data }) => {
          if (data.sucsses) {
            setSave("Сохранено");
          } else {
            setSave(data.err);
          }
        });
    }
  }

  function handleChangeAbout(event) {
    event.preventDefault();
    setAbout(event.target.value);
  }
  function handleChangeDrinks(event) {
    event.preventDefault();
    setDrinks(event.target.value);
  }
  function handleChangeTopics(event) {
    event.preventDefault();
    setTopics(event.target.value);
  }
  function handleChangeActivity(event) {
    event.preventDefault();
    setActivity(event.target.value);
  }

  function LogOut() {
    removeCookies("userName");
  }

  useEffect(() => {
    storage
      .ref(`images/${cookies.userName}`)
      .getDownloadURL()
      .then(url => {
        setUrl(url);
      });
    axios
      .post("http://localhost:4000/users/profileEdit", {
        id
      })
      .then(({ data }) => {
        setActivity(data.profileId.activity);
        setDrinks(data.profileId.drinks);
        setAbout(data.profileId.about);
        setTopics(data.profileId.topics);
        profileInit(data.profileId);
      });
  }, [profileInit, id]);

  function photoDownload(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  }

  return (
    <>
      <div className="full-wh">
        <div className="bg-animation">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
          <div id="stars4" />
        </div>
      </div>
      <Navbar />
      <div className="profile-container">
        <div>
          <img
            style={{
              width: `${200}px`,
              height: `${200}px`,
              borderRadius: `${50}%`,
              alignSelf: "center",
              border: "double 4px #fff"
            }}
            src={url}
          />
        </div>
        <div className="example-1">
          <div className="form-group">
            <label className="label">
              <i className="material-icons">attach_file</i>
              <input
                type="file"
                onChange={photoDownload}
                style={{
                  backgroundColor: "transparent",
                  color: "#FFF"
                }}
              />
            </label>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <form onSubmit={patchData} className="edit">
            <span
              style={{
                textShadow: "none",
                marginBottom: "8px",
                marginTop: "0px",
                color: "#fff"
              }}
            >
              Activity:
            </span>
            <label>
              <input
                value={activity}
                onChange={handleChangeActivity}
                className="form-control"
                type="text"
                name="activity"
                onInput="this.className"
                required
                style={{ color: "#0f4567" }}
              />
            </label>
            <span
              style={{ textShadow: "none", marginBottom: "8px", color: "#fff" }}
            >
              Topics:
            </span>
            <label>
              <input
                value={topics}
                onChange={handleChangeTopics}
                className="form-control"
                type="text"
                name="topics"
                onInput="this.className"
                required
                style={{ color: "#0f4567" }}
              />
            </label>
            <span
              style={{ textShadow: "none", marginBottom: "8px", color: "#fff" }}
            >
              About:
            </span>
            <label>
              <input
                value={about}
                onChange={handleChangeAbout}
                className="form-control"
                type="text"
                name="about"
                onInput="this.className"
                required
                style={{ color: "#0f4567" }}
              />
            </label>
            <span
              style={{ textShadow: "none", marginBottom: "8px", color: "#fff" }}
            >
              Drinks:
            </span>
            <label>
              <input
                value={drinks}
                onChange={handleChangeDrinks}
                className="form-control"
                type="text"
                name="drinks"
                onInput="this.className"
                required
                style={{ color: "#0f4567" }}
              />
            </label>
            <button
              style={{
                color: "#FFF",
                backgroundColor: "#0f4667",
                textShadow: "1px 1px 1px #0f4667"
              }}
            >
              {" "}
              Save changes{" "}
            </button>
            {save}
          </form>
        </div>
        <div>
          <Link to="/login" onClick={LogOut} style={{ position: "relative" }}>
            <img src="./navbar/exit-door.png"></img>
          </Link>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  profileId: state.user.profileId,
  err: state.error
});
const mapDispatchToProps = dispatch => ({
  profileInit: profileId => dispatch(profileInit(profileId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
