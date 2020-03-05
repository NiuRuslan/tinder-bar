import React from 'react';
import axios from "axios"
// import "./anketaJS"
import './anketa.css';
class Anketa extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      name:  '',
      DOB: '',
      activity: '', 
      topics: '',
      drinks: '',
      about:''
    }
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }
   
  handleSubmit = async event => {
    event.preventDefault()
    const { name, DOB, activity, topics, drinks, about} = this.state
    const { data } = await axios.post("http://localhost:3000/addTodo", {
      name, DOB, activity, topics, drinks, about
    });
  
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="btn btn-secondary" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}
  
  render() {    
    return (
      <React.Fragment>
     
      <p>Step {this.state.currentStep} </p> 

      <form onSubmit={this.handleSubmit}>
      {/* 
        render the form steps and pass required props in
      */}
        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          name={this.state.name}
          DOB={this.state.DOB}
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
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div className="form-group">
        <label>
        <input   value={props.name}
        onChange={props.handleChange} className="form-control"type="text" name="name" placeholder="Name" oninput="this.className" />
         </label>
         <label>
           <input value={props.DOB}
        onChange={props.handleChange} className="form-control"type="date" name="BOD" placeholder="Date of Birth" oninput="this.className" max="2001-12-31" />
         </label>
         <label>
           <input  value={props.activity}
        onChange={props.handleChange} className="form-control"type="text" name="activity" placeholder="Place of work or study" oninput="this.className" />
         </label>

    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <div className="form-group">
     <label>
            <input value={props.topics}
        onChange={props.handleChange} className="form-control"type="text" oninput="this.className" name="topics" placeholder="Favorite topics: politic, humor.." />
          </label>
          <label>
            <input type="text"value={props.drinks}
        onChange={props.handleChange} className="form-control" oninput="this.className" name="drinks" placeholder="Favorite alchogol: beer, wine, wiskey.." />
          </label>

    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
  
    <React.Fragment>

    <div className="form-group">
    <label>
            <input value={props.about}
        onChange={props.handleChange} className="form-control"type="text" name="about"oninput="this.className" placeholder="Describe yourself" />
          </label>
       

  
    </div>
    <button className="btn btn-success btn-block" style={{color:"red"}}>Save it</button>

    </React.Fragment>
     
  );
}
export default Anketa
// function Anketa() {
//   const SendHandler = async event => {
//     // event.preventDefault();
//     const name = event.target.name.value;
//     console.log(name);

//     event.target.reset();
//     // const { data } = await axios.post("http://localhost:3000/addTodo", {

//     // });
//   };
//   return (
//     <>
//       <form id="regForm" action="">

//         <h1>Your information:</h1>

//         <div className="tab">
//           <label>
//             <input type="text" name="name" placeholder="Name" oninput="this.className" />
//           </label>
//           <label>
//             <input type="date" name="birthDay" placeholder="Date of Birth" oninput="this.className" max="2001-12-31" />
//           </label>
//           <label>
//             <input type="text" name="placeOfWorkOrStudy" placeholder="Place of work or study" oninput="this.className" />
//           </label>
//         </div>

//         <div className="tab">
//           <label>
//             <input type="text" oninput="this.className" name="topics" placeholder="Favorite topics: politic, humor.." />
//           </label>
//           <label>
//             <input type="text" oninput="this.className" name="alchogol" placeholder="Favorite alchogol: beer, wine, wiskey.." />
//           </label>
//         </div>

//         <div className="tab">
//           <label>
//             <input type="text" oninput="this.className" placeholder="Describe yourself" />
//           </label>
//         </div>



//         <div style={{ overflow: "auto" }}>
//           <div style={{ float: "right" }}>
//             <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
//             <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
//           </div>
//         </div>

//         <div style={{ textAlign: "center", marginTop: "40px" }}>
//           <span className="step"></span>
//           <span className="step"></span>
//           <span className="step"></span>
//           <span className="step"></span>
//         </div>

//       </form>
//     </>
//   );
// }

// export default Anketa;
{/* //<form onSubmit={SendHandler}>
// <div className="segment">
//     <h1>Sign up</h1>
//   </div> 
// <ol className="stepper">
//   <li className="step current" id="one">
//     <header className="step_header">
//         <h2 className="step__title">Step One</h2>
//         <a href="#one" className="step__edit"><i class="fa fa-pencil-square-o"></i> </a>
//     </header>
    
//     <div className="card">
//       <a href="#" className="close">x</a>
//       <label>
//     <input type="text" name="name"placeholder="Name"/>
//   </label>
//   <label>
//     <input type="date" name="birthDay"placeholder="Date of Birth" max="2001-12-31"/>
//   </label>
//   <label>
//     <input type="text" name="placeOfWorkOrStudy"placeholder="Place of work or study"/>
//   </label>
//     </div>
  
//     <div className="step__actions"> 
//       <button formAction="/#two" type="submit" className="step__next unit"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
//     </div>

//   </li>
//   <li className="step" id="two">
//     <header className="step_header">
//         <h2 className="step__title">Step Two</h2>
//         <a href="#two" className="step__edit"> <i class="fa fa-pencil-square-o"></i> </a>
//     </header>

//     <div className="card">
//       <a href="#" className="close">x</a>
//       <label>
//     <input type="text"  name="topics"placeholder="Favorite topics: politic, humor.."/>
//   </label>  
//   {/* <label>
//    <input type="text" placeholder="Favorite places: bars, pubs.."/>
//   </label>  
//   <label>
//     <input type="text"  name="alchogol"placeholder="Favorite alchogol: beer, wine, wiskey.."/>
//   </label>
//    </div>
//     <div className="step__actions"> 
//       <button formAction="/#three"  className="step__next unit"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
//     </div>
//   </li>
//   <li className="step" id="three">
//     <header className="step_header">
//         <h2 className="step__title">Step Three</h2>
//         <a href="#three" className="step__edit"> <i class="fa fa-pencil-square-o"></i> </a>
//     </header>
//     <div className="card">
//       <a href="#" className="close">x</a>
//       <label>
//     <input type="text" placeholder="Describe yourself"/>
//   </label>    </div>
//       <div className="step__actions"> 
//         <button formAction="/#two" type="submit" className="step__next unit"><i class="fa fa-check-circle-o" aria-hidden="true"></i></button>
//       </div>
//   </li>
// </ol>
// </form> */}
