import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import './Issues.css'
import './SignUp.css'

class Issues extends React.Component {
    state = {
        username: '',
        body: '',
        redirect: null,
        issues: []
    }

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


    render() {

        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return (
            <div className="fullscreen">
                <button className="logout signup" onClick={this.logOut}>Logout</button>
                <div className="upper-div">TEAM DETAILS HERE</div>
                <div className="lower-div">
                    ALL THE ISSUES GO HERE
                </div>
            </div>
        )
    }
}

export default Issues