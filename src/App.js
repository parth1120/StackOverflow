import React, { Component } from 'react';
import './component/Auth/SignRouter'
import './Dashboard/dashboard'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Dashboard from "./Dashboard/dashboard";
import AddQuestion from "./Dashboard/addQuestion";
import SignInForm from "./component/Auth/SignInForm";
import SignUpForm from "./component/Auth/SignUpForm";



class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route path="/login" exact component={SignInForm}></Route>
                <Route path="/signup" exact component={SignUpForm}></Route>

                <Route path="/" exact component={Dashboard}></Route>
                <Route path ='/addquestion' exact component = {AddQuestion}/>
            </div>

        </Router>

    );
  }
}

export default App;
