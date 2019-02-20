import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import 'react-tagsinput/react-tagsinput.css'


class Dashboard extends Component {

    state = {
        error: [],
        questions: [],
        page: 1,
        scrollLoader: false,
    };


    componentDidMount() {
        this.loadQuestion();

        window.onscroll = (ev) => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                const newPage = this.state.page + 1;
                this.setState({page: newPage})
                this.loadQuestion()
            }
        };
    }


    loadQuestion = () => {
        const token = localStorage.getItem('token');

        axios.get(`http://10.42.0.1:3000/api/question/my-questions/${this.state.page}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                if (response.data.data.length === 10) {
                    this.setState({scrollLoader: true})

                } else {
                    this.setState({scrollLoader: false})
                }


                // copy state
                let questionsArray = [...this.state.questions];
                const concatedArray = questionsArray.concat(response.data.data);
                this.setState({questions: concatedArray})
            })
    };

    countLike = (likeArr) => {
        let count = 0;
        for (let i = 0; i < likeArr.length; i++) {
            count += likeArr[i].count
        }

        return count
    };


    logout = () => {
        localStorage.removeItem('token');
    }

    render() {

        return (

            <div className="container">
                <Link className="btn-lg btn-success link" to="/addquestion">Add question</Link>
                <Link className="btn-lg btn-danger" to="/login" onClick={this.logout}>Log out</Link>

                <div>{

                    this.state.questions.map(question =>
                        <div className=" cardd  col-12" key={question._id}>
                            <p className=" card-header title">{question.title} </p>

                            <div className="card-body">
                                <p>{question.description} </p>
                                <div className="flex-container">{question.tags.map(tag =>
                                    <p key={tag._id}>
                                        <button className="btn-info ">{tag.name}</button>
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
                {this.state.scrollLoader ?
                    <div className="text-center p-3">
                        <Loader
                            type="Circles"
                            color="#00BFFF"
                            height="50"
                            width="50"

                        />
                    </div> : null}


            </div>
        );
    }
}

export default Dashboard;

