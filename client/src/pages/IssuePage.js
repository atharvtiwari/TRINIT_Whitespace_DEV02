import React from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

import './IssuePage.css'

var data

class IssuePage extends React.Component {
    state = {
        id: 0,
        desc: '',
        subject: '',
        status: '',
        priority: '',
        type: '',
        opened_by: '',
        disc: [],
        body: '',
        redirect: null
    }

    componentDidMount() {
        this.getPath()
    }
    
    getPath = () => {
        var path = window.location.pathname
        axios.get(`/bugtracker${path}`)
        .then((response) => {
            data = response.data;
            console.log(data)
            this.setState({ 
                id: data.id,
                desc: data.description,
                subject: data.subject,
                status: data.status,
                priority: data.priority,
                type: data.type,
                opened_by: data.opened_by,
                disc: data.discussion 
            })
        })
        .catch(() => {
            console.log('error')
            this.setState({ redirect: '/' })
        })
    }

    displayDiscussion = (disc) => {
        if (!disc.length) return null;

        return disc.map((disc, index) => (
            <div key={index} className="disc-display">
                <p className="disc-content">{disc}</p>
                <button className='delete-disc disc-button' id={index} onClick={this.deletedisc}>Delete Comment</button>
            </div>
        ))
    };
    
    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
        console.log(this.state.disc, 'handle change')
    };

    resetUserInputs = () => {
        this.setState({
            body: ''
        });
    };

    submit = (event) => {
        event.preventDefault();
        this.state.disc.push(this.state.body)
        const payload = {
            discussion: this.state.disc,
            id: this.state.id
        };

        axios({
            url: '/bugtracker/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server');
                this.getPath();
                this.resetUserInputs();
            })
            .catch(() => {
                console.log('Internal server error');
            });;
        
        console.log(this.state)
    };

    render() {
        return (
            <div className="issue-full">
                <div className="issue-container">
                    <div className="issue-group">
                        Subject: {this.state.subject}
                    </div>
                    <div className="issue-group">
                        Description: {this.state.desc}
                    </div>
                    <div className="issue-group">
                        Status: {this.state.status}
                    </div>
                    <div className="issue-group">
                        Priority: {this.state.priority}
                    </div>
                    <div className="issue-group">
                        Type: {this.state.type}
                    </div>
                    <div className="issue-group">
                        Opened_By: {this.state.opened_by}
                    </div>
                    <div className="discussion">
                        Discussion:
                        {this.displayDiscussion(this.state.disc)}
                    </div>
                    <div className="comment-area">
                        <form onSubmit={this.submit}>
                            <textarea
                                className="comment-input"
                                placeholder="Enter Comment"
                                name="body"
                                cols="30"
                                rows="10"
                                value={this.state.body}
                                onChange={this.handleChange}
                            >
                            </textarea>
                            <button className="comment-button disc-button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default IssuePage;