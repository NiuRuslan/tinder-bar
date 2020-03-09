import React from 'react';
import Slider from "../slider/Slider"
import Slider2 from "../slider/Slider2"

import axios from "axios"
// import "./anketaJS"
import './anketa.css';
import { LogIn } from '../../redux/action'
import { connect } from 'react-redux'
class Anketa extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      name: '',
      DoB: '',
      activity: '',
      topics: '',
      drinks: '',
      about: '',
      random: 0
    }
  }
  componentDidMount() {
    // let random = (Math.floor(Math.random() * 10))
    this.setState({
      ...this.state,
      random: (Math.floor(Math.random() * 10))
    })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { user } = this.props
    let { name, DoB, activity, topics, drinks, about } = this.state
    topics = topics.split(/\W{1,}/gm)
    drinks = drinks.split(/\W{1,}/gm)

    await axios.post("http://localhost:4000/users/profile", {
      name, DoB, activity, topics, drinks, about, id: user.id
    });
    const profileId = {
      person: user.id, name, DoB, activity, about, topics, drinks,
    }
    this.props.LogIn(user.id, user.nickname, profileId)
    this.props.history.push('/listUsers')
  }

  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2 ? 3 : currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <>
        <button
          className="btn btn-secondary"
          type="button" onClick={this._prev}>
          Previous
      </button>
      <br/>
      </>
      )
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button" onClick={this._next} style={{ marginBottom: "25px", color: "#FFF", backgroundColor: "#0f4667", textShadow: "1px 1px 1px #0f4667" }}>
          Next
      </button>
      )
    }
    return null;
  }

  render() {
    return (
      <>
        {this.state.random > 5 ?
          (<Slider />) : (<Slider2 />)}
        <form onSubmit={this.handleSubmit}>
          <p >Step {this.state.currentStep} </p>
          {/* render the form steps and pass required props in */}
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            name={this.state.name}
            DoB={this.state.DoB}
            activity={this.state.activity}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            topics={this.state.topics}
            drinks={this.state.drinks}
          />
          <Step3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            about={this.state.about}
          />
          {this.previousButton()}
          {this.nextButton()}
        </form>
      </>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  }
  return (
    <div className="form-group">
      <label>
        <input value={props.name}
          onChange={props.handleChange} className="form-control" type="text" name="name" placeholder="Name" oninput="this.className" required />
      </label>
      <label>
        <input value={props.DoB}
          onChange={props.handleChange} className="form-control" type="date" name="DoB" placeholder="Date of Birth" oninput="this.className" max="2001-12-31" min="1920-12-31" required />
      </label>
      <label>
        <input value={props.activity}
          onChange={props.handleChange} className="form-control" type="text" name="activity" placeholder="Place of work or study" oninput="this.className" required />
      </label>
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  }
  return (
    <div className="form-group">
      <label>
        <input value={props.topics}
          onChange={props.handleChange} className="form-control" type="text" oninput="this.className" name="topics" placeholder="Favorite topics: politic, humor.." />
      </label>
      <label>
        <input type="text" value={props.drinks}
          onChange={props.handleChange} className="form-control" oninput="this.className" name="drinks" placeholder="Favorite drink: beer, wine, wisky.." />
      </label>

    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  }
  return (
    <>
      <div className="form-group">
        <label>
          <input value={props.about}
            onChange={props.handleChange} className="form-control" type="text" name="about" oninput="this.className" placeholder="Describe yourself" />
        </label>
      </div>
      <button className="btn btn-success btn-block" style={{ marginBottom: "25px", color: "#FFF", backgroundColor: "#0f4667", textShadow: "1px 1px 1px #0f4667" }}>Save it</button>
      {/* <button className="btn btn-success btn-block" style={{ color: "red" }}>Save it</button> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  LogIn: (id, nickname, profileId) => dispatch(LogIn(id, nickname, profileId))
});
export default connect(mapStateToProps, mapDispatchToProps)(Anketa)
