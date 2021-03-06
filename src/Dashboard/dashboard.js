import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import 'react-tagsinput/react-tagsinput.css'
import Moment from 'react-moment';
import Dropdown from 'react-bootstrap/Dropdown';



class Dashboard extends Component {

    state = {
        error: [],
        questions: [],
        page: 1,
        scrollLoader: false,

        like: 0,
        updated: false,
        id: '',
        name: ''
    };


    componentDidMount() {

        const name = localStorage.getItem('name');
        this.setState({name: name})
        const myUserId = localStorage.getItem('id');
        this.setState({id: myUserId}, () => {
            this.loadQuestion();
        });


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

        axios.get(`http://10.42.0.1:3000/api/question/general/${this.state.page}`,
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

    handleChang = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };



    render() {

        return (

            <div className="container ">


                <div>
                    <div className="d-flex justify-content-between">
                        <Link className="btn btn-sm btn-outline-success " to="/addquestion">Add question</Link>
                        <Link className="btn btn-sm btn-outline-primary" to="/myquestion">My Questions</Link>

                        {/*<Link className="btn btn-sm btn-outline-danger" to="/login" onClick={this.logout}>Log out</Link>*/}

                        <Dropdown>
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

                        this.state.questions.map(question =>
                            <div className=" cardd  col-12" key={question._id}>
                                <Link className="titleProp" to={`/questionview/${question._id}`}>  {question.title} </Link>
                                <hr></hr>

                                <div className="card-body">
                                    <p className="contentProp">{question.description} </p>
                                    <div className="d-flex justify-content-sm-start">{question.tags.map(tag =>
                                        <p key={tag._id}>
                                            <Link className="btn btn-sm btn-outline-info tag "  to={`/tags/${tag.name}`}>{tag.name}</Link>
                                        </p>
                                    )}
                                    </div>

                                    <p className="contentProp">
                                        {
                                            this.myCountLike(question.like) === 'positive' ?
                                                <button className="far fa-thumbs-up text-success"
                                                        onClick={this.handelLike(0, question._id)}/> :
                                                <button className="far fa-thumbs-up"
                                                        onClick={this.handelLike(1, question._id)}/>}

                                        {
                                            this.myCountLike(question.like) === 'negative' ?
                                                <button className="far fa-thumbs-down text-danger"
                                                        onClick={this.handelLike(0, question._id)}/> :
                                                <button className="far fa-thumbs-down"
                                                        onClick={this.handelLike(-1, question._id)}/>}
                                    </p>

                                    <br/>
                                    <p className="contentProp">
                                    Total like count :
                                    <b > {
                                        this.countLike(question.like)
                                    }</b></p>
                                    <hr></hr>



                                    <p className="contentProp">
                                        <b>Created at -</b>
                                        <Moment format="DD/MM/YYYY  HH:mm">
                                            {question.createdAt}
                                        </Moment>
                                    </p>

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

