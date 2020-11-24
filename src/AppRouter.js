
import React from 'react';
import './App.css';
import './pages/LoginPage';
import './pages/Register';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Sales from './pages/Sales';
import AccountR from './pages/AccountR'

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginFormik from './pages/LoginPage';
import Register from './pages/Register';
import firebase from "firebase/app";
import "firebase/firestore";
import LoginPage from './pages/LoginPage';


function AppRouter() {
  return (
    <div style={{width: "100%", height:"100%", flex: 1}}>
      <Router>
        <Navbar />
        <Switch>
        <Route path="/LoginPage" component={LoginPage}></Route>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/RegisterNew' component={Register} />
          <Route path='/Sales' component={Sales}/>
          
          <Route path='/AccountR' component={AccountR}/>
          
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
