import React, {Component} from 'react';
import './component/Auth/SignRouter'
import './Dashboard/dashboard'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PrivateRoute} from "./Router/PrivateRoute";
import myQuestion from "./component/myquestion/myQuestion";
import AddQuestion from "./Dashboard/addQuestion";
import SignInForm from "./component/Auth/SignInForm";
import SignUpForm from "./component/Auth/SignUpForm";
import Dashboard from "./Dashboard/dashboard";


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
                        <Route path="/login" exact component={SignInForm}/>
                        <Route path="/signup" exact component={SignUpForm}/>


                        <PrivateRoute exact path="/myquestion" component={myQuestion}/>
                        <PrivateRoute exact path="/" component={Dashboard}/>
                        <PrivateRoute path='/addquestion' exact component={AddQuestion}/>
                    </Switch>
                </div>
            </Router>

        );
    }
}

export default App;
