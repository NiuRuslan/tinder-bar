import React, { useState, useEffect } from 'react';
import Slider from "../src/components/slider/Slider"
import Slider2 from "../src/components/slider/Slider2"
import Anketa from "./components/anketa/Anketa"
import './App.css';
import Login from './components/Login/Login';
import Regist from './components/Regist/Regist';
import ListUsers from './components/ListUsers/ListUsers';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import StartPage from './components/startPage/startPage';
import { useCookies } from 'react-cookie';
import NotFound from './components/notFound/notFound';

function App() {

  const [slider, setSlider] = useState();
  useEffect(() => {
    let slider = (Math.floor(Math.random() * 10))
    setSlider(slider);
  }, [0]);

  const history = createBrowserHistory();
  const [cookies, setCookie] = useCookies(['userName', 'chacked']);
  return (
    <>
      {slider > 5 ?
        (<Slider />) : (<Slider2 />)}
      <Router>
        {cookies.chacked === 'true' ? (cookies.userName ? null : <Redirect to='/login' />) : <Redirect to='/startpage' />}
        <Switch>
          <Route exact path="/listUsers" component={ListUsers} />
          <Route exact path="/profile" component={Anketa} />
          <Route exact path="/regist" component={Regist} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/startpage" component={StartPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
