import React, {Component} from 'react';

import axios from 'axios';
import {regUpper, regLower, regNumber, regChar, regLength, regEmail} from '../../shared/regex'
import {signUrl} from '../../shared/url'
import * as alertify from 'alertify.js';
import '../../App.css';
import FirstPage from './firstPage'


class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.handelSubmit = this.handelSubmit.bind(this);


    }


    state = {
        name: '',
        nameRequired: false,
        nameError: false,

        email: '',
        emailRequired: false,
        emailError: false,

        no: '',
        noRequired: false,
        noError: false,

        pass: '',
        passRequired: false,
        passError: false,

        check: false,
        checkRequired: false,

        upperCase: false,
        lowerCase: false,
        number: false,
        char: false,
        length: false,
        showLoader: false,


    };





    showUpperCase = () => {
        if (!regUpper.test(this.state.pass)) {
            this.setState({upperCase: true})
        } else {
            this.setState({upperCase: false})
        }
    };

    showLowerCase = () => {
        if (!regLower.test(this.state.pass)) {
            this.setState({lowerCase: true})
        } else {
            this.setState({lowerCase: false})
        }
    };

    showNumber = () => {
        if (!regNumber.test(this.state.pass)) {
            this.setState({number: true})
        } else {
            this.setState({number: false})
        }
    };

    showChar = () => {
        if (!regChar.test(this.state.pass)) {
            this.setState({char: true})
        } else {
            this.setState({char: false})
        }
    };

    showLength = () => {
        if (!regLength.test(this.state.pass)) {
            this.setState({length: true})
        } else {
            this.setState({length: false})
        }
    };

    validateCheck = () => {
        if (!this.state.check) {
            this.setState({checkRequired: true})
        } else {
            this.setState({checkRequired: false})
        }
    };

    changeCheck = (event) => {

        this.setState({check: !this.state.check}, () => {
            this.validateCheck()
        })
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


    validateName = () => {
        if (this.state.name === '') {
            this.setState({nameRequired: true})
        } else if (!/^[a-zA-Z ]*$/.test(this.state.name)) {
            this.setState({nameError: true})
        }
    };

    changeName = (event) => {

        this.setState({nameRequired: false});
        this.setState({nameError: false});
        this.setState({name: event.target.value}, () => {
            this.validateName()
        })
    };


    validateNo = () => {
        if (this.state.no === '') {
            this.setState({noRequired: true})
        } else if (!/^[0-9]{10}$/.test(this.state.no)) {
            this.setState({noError: true})
        }
    };

    changeNo = (event) => {

        this.setState({noRequired: false});
        this.setState({noError: false});
        this.setState({no: event.target.value}, () => {
            this.validateNo()
        })
    };

    validatePass = () => {
        if (this.state.pass === '') {
            this.setState({passRequired: true})
        } else if (!/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/.test(this.state.pass)) {
            this.setState({passError: true})
        }
    };

    changePass = (event) => {

        this.setState({passRequired: false});
        this.setState({passError: false});
        this.setState({pass: event.target.value}, () => {
            this.validateName();
            this.showUpperCase();
            this.showLowerCase();
            this.showNumber();
            this.showChar();
            this.showLength()
        })
    };


    handelSubmit = async (e) => {
        if (e) e.preventDefault();
        {

            await this.validateName();
            await this.validateEmail();
            await this.validateNo();
            await this.validatePass();
            await this.validateCheck();


            if (!this.state.nameRequired && !this.state.nameError && !this.state.emailRequired && !this.state.emailError
                && !this.state.noRequired && !this.state.noError && !this.state.passRequired && !this.state.passError && !this.state.checkRequired) {
                this.setState({showLoader: true});

                const body = {
                    name: this.state.name,
                    email: this.state.email,
                    mobile: this.state.no,
                    password: this.state.pass,
                };

                axios.post(signUrl, body)
                    .then((res) => {
                        console.log(res);
                        console.log(res.data);
                        this.setState({showLoader: false});
                        alertify.logPosition('top right').success(res.data.message);



                    })
                    .catch((err) => {
                        console.error(err.response);
                        this.setState({showLoader: false});
                        alertify.logPosition('top right').error(err.response.data.message);

                    })

            }
        }


    };


    render() {
        return (
            <FirstPage>
                <div className="App">

            <div className="FormCenter">
                {this.state.showLoader ?
                    <div className="loader loader-default is-active" data-text="Verifying, please wait ..." data-blink
                         id="loginLoader">
                    </div> : null}

                <div>
                    <form onSubmit={this.handelSubmit}>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">Name:</label>
                            <input className="FormField__Input FormField__Input"
                                   placeholder="Enter your Name" type="text" onChange={this.changeName}
                                   value={this.state.name}/>
                            {this.state.nameRequired ? <p className="errorMsg">Name required</p> : null}
                            {this.state.nameError ? <p className="errorMsg">Invalid name</p> : null}
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">Email ID:</label>
                            <input className="FormField__Input" type="email" placeholder="Enter your Email"
                                   onChange={this.changeEmail} value={this.state.email}/>
                            {this.state.emailRequired ? <p className="errorMsg">Email required</p> : null}
                            {this.state.emailError ? <p className="errorMsg">Invalid email</p> : null}
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">Mobile No.:</label>
                            <input className="FormField__Input  FormField__Input"
                                    onChange={this.changeNo}
                                   placeholder="Enter your Number" value={this.state.no}/>
                            {this.state.noRequired ? <p className="errorMsg">Number required</p> : null}
                            {this.state.noError ? <p className="errorMsg">Invalid Number</p> : null}
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">Password:</label>
                            <input className="FormField__Input FormField__Input"
                                   placeholder="Enter your Password" type="password" onChange={this.changePass}
                                   value={this.state.pass}/>
                            {this.state.passRequired ? <p className="errorMsg">Password required</p> : null}
                            {this.state.passError ? <p className="errorMsg">Invalid Password</p> : null}
                        </div>


                        <div className="errorMsg">
                            <ul>
                                {this.state.upperCase ? <li>At least one uppercase character</li> : null}
                                {this.state.lowerCase ? <li>At least one lowercase character</li> : null}
                                {this.state.number ? <li>At least one number character</li> : null}
                                {this.state.char ? <li>At least one Special character</li> : null}
                                {this.state.length ? <li>At least 8 character</li> : null}
                            </ul>


                        </div>


                        <div>
                            <label className="FormField__Label1">Terms and conditions</label>
                            <span> "      "</span>

                            <input type="checkbox" onChange={this.changeCheck} value={this.state.check}></input>
                            {this.state.checkRequired ? <p className="errorMsg">Terms required</p> : null}

                        </div>
                        <br></br>
                        <br></br>

                        <input type="submit" value="Register" className="FormField__Button mr-20"></input>
                    </form>
                </div>
            </div>
                </div>
            </FirstPage>

        );
    }


}


export default SignUpForm;
