import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Download from './download.png';

class FirstPage extends Component {



    render() {
        return (
            <div className="container">
                <div >
                    <img src={Download} alt="golf" className="image"/>
                </div>
                <div className="d-flex justify-content-center">

                    <Link className="btn btn-lg btn-outline-primary " to="/login">Sign In</Link>

                    <Link className="btn btn-lg btn-outline-primary " to="/signup">Sign Up</Link>
                </div>


                {this.props.children}

            </div>
        );
    }
}

export default FirstPage;