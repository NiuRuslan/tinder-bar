import React from 'react';
import './App.css';
import Login from './components/Login/Login'
import Regist from './components/Regist/Regist'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import StartPage from './components/startPage/startPage'
import { useCookies } from 'react-cookie';
import NotFound from './components/notFound/notFound'

function App() {
  const [cookies, setCookie] = useCookies(['userName', 'chacked']);
  return (
    <>
      <Router>
        {cookies.chacked==='true' ? (cookies.userName ? null : <Redirect to='/login' />) : <Redirect to='/startpage' />}
        <Switch>
          <Route exact path='/startpage' component={StartPage} />
          <Route exact path='/regist' component={Regist} />
          <Route exact path='/login' component={Login} />
          <Route component={NotFound}/>
        </Switch>
      </Router>

    </>
  );
}

export default App;
