import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'

import './SignUp.css'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        redirect: null,
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    submit = (event) => {
        event.preventDefault();

        const payload = {
            username: this.state.username,
            password: this.state.password,
        };

        axios({
            url: '/bugtracker/login',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server');
                this.resetUserInputs();
                this.setState({ redirect: "/home" });
            })
            .catch((err) => {
                console.log('Internal server error', err);
            })
    };

    resetUserInputs = () => {
        this.setState({
            username: '',
            password: '',
        });
    };

    render() {
        console.log('State: ', this.state);
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return (
            <div className='fullscreen-container'>
                <form className='signup-container' onSubmit={this.submit}>
                    <h3 className='signup-title'>Welcome</h3>
                    <div className='signup-group'>
                        <label>Username</label>
                        <input type='text' name='username' placeholder='Enter Username' value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className='signup-group'>
                        <label>Password</label>
                        <input type='password' name='password' placeholder='Enter Password' value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <button type='submit' className='signup-button'>Login</button>
                </form>
            </div>
        )
    }
}

export default Login