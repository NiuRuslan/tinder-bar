import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { profileInit } from '../../redux/action';
import axios from 'axios'




function ProfileEdit(props) {
  const [cookies, setCookie] = useCookies(['userName']);
  const [activity, setActivity] = useState('')
  const [drinks, setDrinks] = useState('')
  const [topics, setTopics] = useState('')
  const [about, setAbout] = useState('')

  const [save, setSave] = useState('')
  const id = cookies.userName;
  const { profileInit } = props;

  function patchData(event) {
    event.preventDefault();


    axios.patch('http://localhost:4000/users/profile', {
      activity,
      drinks,
      topics,
      about,
      id,
    }).then(({ data }) => {
      if (data.sucsses) {
        setSave('Сохранено')
      } else {
        setSave(data.err)
      }
    })
  }

  function handleChangeAbout(event) {
    event.preventDefault();
    setAbout(event.target.value)
  }
  function handleChangeDrinks(event) {
    event.preventDefault();
    setDrinks(event.target.value)
  }
  function handleChangeTopics(event) {
    event.preventDefault();
    setTopics(event.target.value)
  }
  function handleChangeActivity(event) {
    event.preventDefault();
    setActivity(event.target.value)
  }

  useEffect(() => {
    axios.post('http://localhost:4000/users/profileEdit', {
      id,
    }).then(({ data }) => {
      setActivity(data.profileId.activity)
      setDrinks(data.profileId.drinks)
      setAbout(data.profileId.about)
      setTopics(data.profileId.topics)
      profileInit(data.profileId)
    })
  }, [profileInit,id])

  return (
    <div>
      <form onSubmit={patchData}>
        <span>activity</span>
        <label>
          <input value={activity}
            onChange={handleChangeActivity} className="form-control" type="text" name="activity" oninput="this.className" required />
        </label>
        <span>topics</span>
        <label>
          <input value={topics}
            onChange={handleChangeTopics} className="form-control" type="text" name="topics" oninput="this.className" required />
        </label>
        <span>about</span>
        <label>
          <input value={about}
            onChange={handleChangeAbout} className="form-control" type="text" name="about" oninput="this.className" required />
        </label>
        <span>drinks</span>
        <label>
          <input value={drinks}
            onChange={handleChangeDrinks} className="form-control" type="text" name="drinks" oninput="this.className" required />
        </label>
        <button type='submit' > Save changes </button>
        {save}
      </form>
      <Link to='/listUsers'>Go to Home</Link>
    </div>
  )
}


const mapStateToProps = (state) => ({
  profileId: state.user.profileId,
  err: state.error,
});
const mapDispatchToProps = (dispatch) => ({
  profileInit: (profileId) => dispatch(profileInit(profileId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);

