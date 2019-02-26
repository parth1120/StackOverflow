import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import 'react-tagsinput/react-tagsinput.css'
import Moment from 'react-moment';
import Dropdown from 'react-bootstrap/Dropdown';
import TextField from '@material-ui/core/TextField';


class QuestionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            error: [],
            questions: [],
            page: 1,


            like: 0,
            updated: false,
            id: '',
            questionView: '',
            question: {
                tags: [],
                like: []
            }


        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {location, match} = this.props;
        if (location.pathname !== prevProps.location.pathname) {
            this.setState({questions: [], page: 1}, () => {
                this.loadQuestion(match.params.questionView);
            });
        }

    }

    componentDidMount() {

        const {questionView} = this.props.match.params;

        const name = localStorage.getItem('name');
        this.setState({name: name});
        const myUserId = localStorage.getItem('id');
        this.setState({id: myUserId}, () => {
            this.loadQuestion(questionView);
        });

    }


    loadQuestion = (questionView) => {
        const token = localStorage.getItem('token');

        axios.get(`http://10.42.0.1:3000/api/question/get-question-by-id/${questionView}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {


                this.setState({question: response.data.data})


            })
            .catch((error) => {
                console.log(error.response)
            })

    };

    handelLike = (param, id) => (value) => {
        const token = localStorage.getItem('token');

        const body = {
            questionId: id,
            vote: param.toString(),
        }

        axios.post('http://10.42.0.1:3000/api/question/vote', body,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                console.log(response);


                // for (let i=0;i<allQuestions.length;i++) {
                //     if (allQuestions[i]._id == id) {
                //         f
                //     }
                // }

                axios.get(`http://10.42.0.1:3000/api/question/get-question-by-id/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then((response) => {
                        console.log(response)

                        const newQuestion = response.data.data;
                        let allQuestions = [...this.state.questions]


                        for (let i = 0; i < allQuestions.length; i++) {
                            if (allQuestions[i]._id === newQuestion._id) {
                                allQuestions[i] = newQuestion
                            }
                        }

                        this.setState({questions: allQuestions})

                    })
                    .catch((error) => {
                        console.log(error.response)
                    })

            })
            .catch((err) => {
                console.log('error', err.response);


            })
        console.log(id)

    };


    countLike = (likeArr) => {
        let count = 0;
        for (let i = 0; i < likeArr.length; i++) {
            count += likeArr[i].count
        }

        return count
    };

    myCountLike = (likeArr) => {

        let found = false;
        let status = 'neutral';

        for (let i = 0; i < likeArr.length; i++) {
            if (likeArr[i].author === this.state.id) {
                found = true

                if (likeArr[i].count === 1) {
                    status = 'positive'
                } else if (likeArr[i].count === -1) {
                    status = 'negative'
                }
            }
        }

        return status
    };


    logout = () => {
        localStorage.removeItem('token');
    }


    render() {

        return (

            <div className="container ">


                <div>
                    <div className="d-flex justify-content-between top">


                        <Link className="btn btn-sm btn-outline-primary text-center p-3 " to="/">Dashboard</Link>
                        <Link className="btn btn-sm btn-outline-primary text-center p-3 " to="/myquestion">My
                            Questions</Link>
                        <Dropdown className="dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                                <Dropdown.Item href="/login" onClick={this.logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                    {
                        <div className=" cardd  col-12">
                            <div className="titleProp"> {this.state.question.title}</div>
                            <hr></hr>
                            <div className="card-body">
                                <div className="contentProp">
                                    {this.state.question.description}
                                </div>
                                <br/>
                                <div className="d-flex justify-content-sm-start">
                                    {this.state.question.tags.map(tag =>
                                        <div className="contentProp" key={tag._id}>
                                            <Link className="btn btn-sm btn-outline-info tag"
                                                  to={`/tags/${tag.name}`}>{tag.name}</Link>

                                        </div>
                                    )}
                                </div>
                                <br/>
                                <div className="contentProp">
                                    {
                                        this.myCountLike(this.state.question.like) === 'positive' ?
                                            <button className="far fa-thumbs-up text-success"
                                                    onClick={this.handelLike(0, this.state.question._id)}/> :
                                            <button className="far fa-thumbs-up"
                                                    onClick={this.handelLike(1, this.state.question._id)}/>}
                                    {
                                        this.myCountLike(this.state.question.like) === 'negative' ?
                                            <button className="far fa-thumbs-down text-danger"
                                                    onClick={this.handelLike(0, this.state.question._id)}/> :
                                            <button className="far fa-thumbs-down"
                                                    onClick={this.handelLike(-1, this.state.question._id)}/>}
                                </div>
                                <div>
                                    <br/>
                                    <p className="contentProp">
                                        Total like count :
                                        <b> {
                                            this.countLike(this.state.question.like)
                                        }</b></p>
                                </div>
                                <hr></hr>
                                <div>
                                    <p className="contentProp"> Your Answer -</p>

                                    <TextField
                                        id="filled-multiline-static"
                                        label="Comment"
                                        multiline
                                        rows="4"

                                        className="classes.textField col-md-12"
                                        margin="normal"
                                        variant="filled"
                                    />
                                    <button className="btn btn-primary">Submit</button>
                                </div>
                                <p className="contentProp">
                                    <b>Created at -</b>
                                    <Moment format="DD/MM/YYYY  HH:mm">
                                        {this.state.question.createdAt}
                                    </Moment>
                                </p>
                            </div>
                        </div>
                    }
                </div>


            </div>
        );
    }
}


export default QuestionView;