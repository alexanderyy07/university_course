/*
 * StudentPage
 *
 * This is the first thing users see of the app
 * Route: /
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from '../Nav.react';
import { connect } from 'react-redux';

import LoginPage from './LoginPage.react';
import RegisterPage from './RegisterPage.react';

class StudentPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentView: parseInt(this.props.params.pageId),
		};
		this.element = <div/>
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
	}
	login()
	{
		this.setState({currentView: 1});
	}
	register()
	{
		this.setState({currentView: 2});
	}
	render() {
    const dispatch = this.props.dispatch;
	switch(this.state.currentView)
	{
		case 0:
			this.element= <section className="text-section">
			{/* Change the copy based on the authentication status */}
			<h1>Welcome to Student Page!</h1>
			<p>This application allows students to login and submit their homework. </p>
			<p>Also it allows teachers to login and estimiate students' homework. </p>

			<div>
				<button className="btn btn--login" onClick={this.login}>Login</button>
				<button className="btn btn--register" onClick={this.register}>Register</button>
			</div>
			</section>;
		break;
		case 1:
			this.element = <LoginPage pos="student" data={this.props}/>;
		break;
		case 2:
			this.element = <RegisterPage pos="student" data={this.props}/>;
		break;
	}
    return (
				<div>
					{this.element}
				</div>
		);
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
	data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(StudentPage);
