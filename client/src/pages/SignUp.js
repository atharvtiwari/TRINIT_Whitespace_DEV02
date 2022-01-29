import React from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom'

import './SignUp.css'

class SignUp extends React.Component {
	state = {
		username: '',
		name: '',
		email: '',
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
			name: this.state.name,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
		};

		axios({
			url: '/bugtracker/signup',
			method: 'POST',
			data: payload
		})
			.then(() => {
				console.log('Data has been sent to the server');
				this.resetUserInputs();
				this.setState({ redirect: "/home" });
			})
			.catch(() => {
				console.log('Internal server error');
			})
	};

	resetUserInputs = () => {
		this.setState({
			name: '',
			username: '',
			email: '',
			password: ''
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
						<input type='text' name='username' placeholder='Enter Username' value={this.state.username} onChange={this.handleChange} />
					</div>
					<div className='signup-group'>
						<label>Name</label>
						<input type='text' name='name' placeholder='Enter Name' value={this.state.name} onChange={this.handleChange} />
					</div>
					<div className='signup-group'>
						<label>Email</label>
						<input type='email' name='email' placeholder='Enter Email' value={this.state.email} onChange={this.handleChange} />
					</div>
					<div className='signup-group'>
						<label>Password</label>
						<input type='password' name='password' placeholder='Enter Password' value={this.state.password} onChange={this.handleChange} />
					</div>
					<input value='Sign Up' type='submit' className='signup-button signup' />
					<h4 className='or'>or</h4>
					<Link to='/login' className='signin-redirect signup'>Sign In</Link>
				</form>
			</div>
		)
	}
}

export default SignUp