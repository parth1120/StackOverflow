import React, {Component} from 'react';
import axios from 'axios'

class Dashboard extends Component {

    componentDidMount() {

        const token = localStorage.getItem('token');

        axios.get('http://10.42.0.1:3000/api/question/my-questions',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(data => {
                console.log(data)
            })

    }

    render() {
        return (
            <div>
                hello
            </div>
        );
    }
}

export default Dashboard;