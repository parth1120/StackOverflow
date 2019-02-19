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

                    <Link className="btn-lg btn-info link1" to="/login">Sign In</Link>

                    <Link className="btn-lg btn-info link2" to="/signup">Sign Up</Link>


                {this.props.children}

            </div>
        );
    }
}

export default FirstPage;