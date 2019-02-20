import React, {Component} from 'react';
import './component/Auth/SignRouter'
import './Dashboard/dashboard'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PrivateRoute} from "./Router/PrivateRoute";
import Dashboard from "./Dashboard/dashboard";
import AddQuestion from "./Dashboard/addQuestion";
import SignInForm from "./component/Auth/SignInForm";
import SignUpForm from "./component/Auth/SignUpForm";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/login" exact component={SignInForm}></Route>
                        <Route path="/signup" exact component={SignUpForm}></Route>


                        <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
                        <PrivateRoute path='/addquestion' exact component={AddQuestion}/>
                    </Switch>
                </div>
            </Router>

        );
    }
}

export default App;
