/*
 * HomePage
 *
 * This is the first thing users see of the app
 * Route: /
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from '../Nav.react';
import { connect } from 'react-redux';

class HomePage extends Component {
	render() {
    const dispatch = this.props.dispatch;

    return (
			<article>
				<div>
					<section className="text-section">
						{/* Change the copy based on the authentication status */}

						<h1>Welcome to Home Page!</h1>

						<p>This application allows students to login and submit their homework. </p>
						<p>Also it allows teachers to login and estimiate students' homework. </p>

					</section>
				</div>
			</article>
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
export default connect(select)(HomePage);
