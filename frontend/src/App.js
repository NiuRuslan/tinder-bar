import React from 'react';
import Anketa from "./components/anketa/Anketa"
import './App.css';
import Login from './components/Login/Login'
import Regist from './components/Regist/Regist'
import ListUsers from './components/ListUsers/ListUsers' //add A.I.
import {
  Link, 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      {/* <Home/> */}
    <Switch>
      <Route exact path='/listUsers' component={ListUsers}/>{/* add A.I. */}
      <Route exact path='/profile' component={Anketa}/>
      <Route exact path='/regist' component={Regist}/>
      <Route path='/' component={Login}/>
    </Switch>
    </Router>
    </>
  );
}

export default App;
