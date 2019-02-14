import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import '../../asset/css-loader.css'
import '../../App.css';


class SignRouter extends Component {


    state = {
        login: true
    }

    changeStateToLogin  = () => {
        this.setState({login: true})
    };

    changeStateToSignUp  = () =>  {
        this.setState({login: false})
    };


    render() {

        console.log()

        return (
                <div className="App">
                    <div className="App__Aside"><h1 className="App__AsideText">Welcome to RevInfotech</h1></div>
                    <div className="App__Form">
                        <div className="PageSwitcher">

                            <a className="PageSwitcher__Item--Active" className="PageSwitcher__Item" onClick={this.changeStateToLogin}>Sign In</a>
                            <a className="PageSwitcher__Item--Active" className="PageSwitcher__Item" onClick={this.changeStateToSignUp}>Sign Up</a>

                        </div>

                        <div className="FormTitle">
                            <a className="FormTitle__Link--Active" className="FormTitle__Link" onClick={this.changeStateToLogin}>Sign In</a>
                            <a  className="FormTitle__Link--Active" className="FormTitle__Link" onClick={this.changeStateToSignUp}>Sign Up</a>

                        </div>
                        {this.state.login ? <SignInForm activeClassName="PageSwitcher__Item--Active" route={this.props.history}/> : <SignUpForm/>}

                    </div>

                </div>
        );
    }

}

export default SignRouter;