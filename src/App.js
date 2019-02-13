import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUpForm from './component/Auth/SignUpForm';
import SignInForm from './component/Auth/SignInForm';
import './asset/css-loader.css'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App__Aside"><h1 className="App__AsideText">Welcome to RevInfotech</h1></div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
              </div>

              <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" 
                  className="FormTitle__Link">Sign In</NavLink> or 
                  <NavLink exact to="/" activeClassName="FormTitle__Link--Active" 
                  className="FormTitle__Link">Sign Up</NavLink>
              </div>

              <Route exact path="/" component={SignUpForm}>
              </Route>
              <Route path="/sign-in" component={SignInForm}>
              </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
