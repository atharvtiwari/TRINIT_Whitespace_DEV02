import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'

import './SignUp.css'

class SignUp extends React.Component {
    render() {
        return (
            <div className='fullscreen-container'>
                <form className='signup-container'>
                    <h3 className='signup-title'>Welcome</h3>
                    <div className='signup-group'>
                        <label>Username</label>
                        <input type='text' name='username' placeholder='Enter Username'/>
                    </div>
                    <div className='signup-group'>
                        <label>Name</label>
                        <input type='text' name='name' placeholder='Enter Username'/>
                    </div>
                    <div className='signup-group'>
                        <label>Email</label>
                        <input type='email' name='email' placeholder='Enter Email'/>
                    </div>
                    <div className='signup-group'>
                        <label>Password</label>
                        <input type='password' name='password' placeholder='Enter Password'/>
                    </div>
                    <button type='submit' className='signup-button'>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp