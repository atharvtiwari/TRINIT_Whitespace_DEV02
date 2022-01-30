import React from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

import './Issues.css'

var data

class Issues extends React.Component {
    state = {
        username: '',
        body: '',
        redirect: null,
        issues: []
    }

    componentDidMount() {
        this.whoLoggedIn()
    }

    whoLoggedIn = () => {
        axios.get('/bugtracker/who')
        .then((response) => {
            data = response.data;
            this.setState({ username: data.username, issues: data.issues_in });
            console.log(`${this.state.username} is logged in`)
        })
        .catch(() => {
            this.setState({ redirect: '/'});
        });
    }

    // getIssues = (event) => {
    //     event.preventDefault();
    //     const payload = {
    //         issues: this.state.issues 
    //     }

    //     axios({
    //         url: '/bugtracker/issues',
    //         method: 'GET',
    //         data: payload
    //     })
    //     .then((res) => {
    //         console.log('Data has been sent to the server');
    //         var data = res.data;
    //         this.setState({issue_content: data})
    //     })
    //     .catch(() => {
    //         console.log('Internal server error');
    //     })

    // }

    logOut = (event) => {
        event.preventDefault();
        const payload = {
            username: this.state.username
        }

        axios({
            url: '/bugtracker/logout',
            method: 'POST',
            data: payload
        })
        .then(() => {
            console.log('Data has been sent to the server');
            this.resetUserInputs();
            this.setState({ redirect: "/" });
        })
        .catch(() => {
            console.log('Internal server error');
        });
    };

    resetUserInputs = () => {
        this.setState({
            body: ''
        });
    };

    displayIssues = (issues) => {
        if (!issues.length) return null;
        console.log(issues)
        return issues.map((issue, index) => (
            <div key={index} className="issue-display">
                <Link to={`${index + 1}`} className="issue-content">{issue}</Link>
                <button className='delete-issue' id={index} onClick={this.deleteIssue}>Delete Issue</button>
            </div>
        ))
    }


    render() {

        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return (
            <div className="fullscreen">
                <button className="logout" onClick={this.logOut}>Logout</button>
                <div className="issues-container">
                    <Link to='/newissue' className="new-issue">New Issue</Link>
                    {this.displayIssues(this.state.issues)}                    
                </div>
            </div>
        )
    }
}

export default Issues