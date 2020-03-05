import React from 'react';
import Anketa from "./components/anketa/Anketa"
import './App.css';
import Login from './components/Login/Login'
import Regist from './components/Regist/Regist'

function App() {
  return (
    <>
    <Login/>
    <Regist/>
      <Anketa/>
</>
  );
}

export default App;
