import React from 'react';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './App.css';
import Login from './components/Login/Login';
import Regist from './components/Regist/Regist';
import ListUsers from './components/ListUsers/ListUsers';
import Warning from './components/Warning/Warning';
import Anketa from './components/anketa/Anketa';
import NotFound from './components/notFound/notFound';
import ProfileEdit from './components/profileEdit/profileEdit';
import Navbar from './components/navbar/Navbar'

function App() {
  const history = createBrowserHistory();
  const [cookies] = useCookies(['userName', 'chacked']);
  return (
    <>
      <Router history={history}>
        {cookies.chacked === 'true' ? (
          cookies.userName ? null : (
            <Redirect to="/login" />
          )
        ) : (
          <Redirect to="/warning" />
        )}
        <Switch>
          <Route exact path="/warning" component={Warning} />
          <Route exact path="/profile" component={ProfileEdit} />
          <Route exact path="/profileCreator" component={Anketa} />
          <Route exact path="/regist" component={Regist} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={ListUsers} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
