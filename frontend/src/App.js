import React from 'react';
import './App.css';
import Login from './components/Login/Login'
import Regist from './components/Regist/Regist'
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
      <Route exact path='/regist' component={Regist}/>
      <Route exact path='/login' component={Login}/>
    </Switch>
    </Router>
    </>
  );
}

export default App;
