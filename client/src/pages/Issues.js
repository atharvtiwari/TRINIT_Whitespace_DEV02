import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import './Issues.css'
import './SignUp.css'

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
            this.setState({ username: data.username });
            console.log(`${this.state.username} is logged in`)
        })
        .catch(() => {
            this.setState({ redirect: '/'});
        });
    }

    // router.get('/home', (req, res) => {
    //     User.findOne({ current: true })
    //     .then((loggedInUser) => {
    //         if(!loggedInUser)
    //         {
    //             return res.status(401).json({ error: "YOU MUST LOG IN" })
    //         }
    //         res.json(loggedInUser)
    //     })
    //     .catch((error) => {
    //         console.log('error: ', error);
    //     });
    // });

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
                {/* <button className="logout signup" onClick={this.logOut}>Logout</button> */}
                <div className="upper-div">TEAM DETAILS HERE</div>
                <div className="lower-div">
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                    <div>
                    ALL THE ISSUES GO HERE
                    </div>
                </div>
            </div>
        )
    }
}

export default Issues