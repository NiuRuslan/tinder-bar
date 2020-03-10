import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { profileInit } from '../../redux/action';
import { storage } from '../../firebase';

function ProfileEdit(props) {
  const [cookies, setCookie, removeCookies] = useCookies(['userName','chacked']);
  const [activity, setActivity] = useState('');
  const [drinks, setDrinks] = useState('');
  const [topics, setTopics] = useState('');
  const [about, setAbout] = useState('');
  const [url, setUrl] = useState(null);
  const [save, setSave] = useState('');
  const id = cookies.userName;
  const { profileInit ,user} = props;
  const [image, setImage] = useState(null);

  function patchData(event) {
    event.preventDefault();
    const uploadTask = storage.ref(`images/${cookies.userName}`).put(image);
    uploadTask.on('state_changed',
      undefined,
      undefined,
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setUrl(url);
        });
      });
    axios.patch('http://localhost:4000/users/profile', {
      activity,
      drinks,
      topics,
      about,
      id,
    }).then(({ data }) => {
      if (data.sucsses) {
        setSave('Сохранено');
      } else {
        setSave(data.err);
      }
    });
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
  user.id=null;
  removeCookies('userName');
  }

  useEffect(() => {
    storage.ref(`images/${cookies.userName}`).getDownloadURL().then((url) => {
      setUrl(url);
    });
    axios.post('http://localhost:4000/users/profileEdit', {
      id,
    }).then(({ data }) => {
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
    <div>
      <img style={{ width: `${200}px`, height: `${200}px`, borderRadius: `${50}%` }} src={url} />
      <input type="file" onChange={photoDownload} />
      <form onSubmit={patchData}>
        <span>activity</span>
        <label>
          <input
            value={activity}
            onChange={handleChangeActivity}
            className="form-control"
            type="text"
            name="activity"
            onInput="this.className"
            required
          />
        </label>
        <span>topics</span>
        <label>
          <input
            value={topics}
            onChange={handleChangeTopics}
            className="form-control"
            type="text"
            name="topics"
            onInput="this.className"
            required
          />
        </label>
        <span>about</span>
        <label>
          <input
            value={about}
            onChange={handleChangeAbout}
            className="form-control"
            type="text"
            name="about"
            onInput="this.className"
            required
          />
        </label>
        <span>drinks</span>
        <label>
          <input
            value={drinks}
            onChange={handleChangeDrinks}
            className="form-control"
            type="text"
            name="drinks"
            onInput="this.className"
            required
          />
        </label>
        <button type="submit"> Save changes </button>
        {save}
      </form>
      
        <button onClick={LogOut}>LogOut</button>
     
     
    </div>
  );
}

const mapStateToProps = (state) => ({
  profileId: state.user.profileId,
  user:state.user,
  err: state.error,
});
const mapDispatchToProps = (dispatch) => ({
  profileInit: (profileId) => dispatch(profileInit(profileId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
