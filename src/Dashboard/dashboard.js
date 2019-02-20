import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

import 'react-tagsinput/react-tagsinput.css'


class Dashboard extends Component {

    state = {
        error: [],
        questions: []
    };


    componentDidMount() {

        const token = localStorage.getItem('token');

        axios.get('http://10.42.0.1:3000/api/question/my-questions/',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                this.setState({questions: response.data.data})
            })


    }


    countLike = (likeArr) => {
        let count = 0;
        for (let i = 0; i < likeArr.length; i++) {
            count += likeArr[i].count
        }

        return count
    };

    render() {

        return (

            <div className="container">
                <Link className="btn-lg btn-success link" to="/addquestion">Add question</Link>

                <div>{

                    this.state.questions.map(question =>
                        <div className=" cardd  col-12" key={question._id}>
                            <p className=" card-header title">{question.title} </p>

                            <div className="card-body">
                                <p>{question.description} </p>
                                <div className="flex-container">{question.tags.map(tag =>
                                    <p key={tag._id}>
                                        <button className="btn-danger ">{tag.name}</button>
                                    </p>
                                )}
                                </div>

                                <button className="btn btn-primary flex-container">
                                    Like {
                                    this.countLike(question.like)
                                }
                                </button>
                                <p><b>Created at</b> - {question.createdAt} </p>
                                <p><b>Updated at</b> - {question.updatedAt} </p>
                            </div>


                        </div>
                    )
                }
                </div>

            </div>
        );
    }
}

export default Dashboard;