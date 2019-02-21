import React, {Component} from 'react';
import {regEmail} from "../../shared/regex";
import axios from 'axios';
import {loginUrl} from '../../shared/url'
import * as alertify from 'alertify.js';


import FirstPage from './firstPage'


class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    state = {
        email: 'shiv@gmail.com',
        emailRequired: false,
        emailError: false,

        pass: 'Hello@123',
        passRequired: false,
    };


    validateEmail = () => {
        if (this.state.email === '') {
            this.setState({emailRequired: true})
        } else if (!regEmail.test(this.state.email)) {
            this.setState({emailError: true})
        }
    };

    changeEmail = (event) => {

        this.setState({emailRequired: false});
        this.setState({emailError: false});
        this.setState({email: event.target.value}, () => {
            this.validateEmail()
        })

    };

    validatePass = () => {
        if (this.state.pass === '') {
            this.setState({passRequired: true})
        }
    };

    changePass = (event) => {
        this.setState({passRequired: false});
        this.setState({pass: event.target.value}, () => {
            this.validatePass()
        })
    };


    handelSubmit = async (e) => {
        if (e) e.preventDefault();
        await this.validateEmail();
        await this.validatePass();

        if (!this.state.emailRequired && !this.state.emailError && !this.state.passRequired) {
            this.setState({showLoader: true});

            const body = {
                email: this.state.email,
                password: this.state.pass,
            };

            axios.post(loginUrl, body)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({showLoader: false});
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('id', res.data.id);
                    this.props.history.push('/')

                })
                .catch((err) => {
                    console.log('error',
                        err.response
                    )
                    ;
                    this.setState({showLoader: false});
                    alertify.logPosition('top right').error(err.response.data.message);

                })

        }
    };


    render() {
        return (
            <FirstPage>
                <div className="App">
                    <div className="FormCenter">
                        {this.state.showLoader ?
                            <div className="loader loader-default is-active" data-text="Verifying, please wait ..."
                                 data-blink
                                 id="loginLoader">
                            </div> : null}

                        <form onSubmit={this.handelSubmit}>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="email">Email ID:</label>
                                <input className="FormField__Input" type="email" placeholder="Enter your Email"
                                       onChange={this.changeEmail} value={this.state.email}/>
                                {this.state.emailRequired ? <p className="errorMsg">Email required</p> : null}
                                {this.state.emailError ? <p className="errorMsg">Invalid email</p> : null}
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Password:</label>
                                <input className="FormField__Input FormField__Input"
                                       placeholder="Enter your Password" type="password" onChange={this.changePass}
                                       value={this.state.pass}/>
                                {this.state.passRequired ? <p className="errorMsg">Password required</p> : null}
                                {this.state.passError ? <p className="errorMsg">Invalid Password</p> : null}
                            </div>

                            <input type="submit" value="Log In" className="FormField__Button mr-20"></input>


                        </form>


                    </div>
                </div>
            </FirstPage>
        )
    }


}


export default SignInForm;
