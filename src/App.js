import React, { Component } from 'react';
import './component/Auth/SignRouter'
import './Dashboard/dashboard'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignRouter from "./component/Auth/SignRouter";
import Dashboard from "./Dashboard/dashboard";


class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route path="/auth" exact component={SignRouter}></Route>
                <Route path="/" exact component={Dashboard}></Route>
            </div>

        </Router>

    );
  }
}

export default App;
