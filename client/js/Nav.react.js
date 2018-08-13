/**
 *
 * Nav.react.js
 *
 * This component renders the navigation bar
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from './actions/AppActions';
import LoadingButton from './LoadingButton.react';
import { browserHistory } from 'react-router';

class Nav extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      gotoAnotherPage: null
    }
    this.teacherPage = this.teacherPage.bind(this);
    this.studentPage = this.studentPage.bind(this);
    this.homePage = this.homePage.bind(this);
    this.loginPage = this.loginPage.bind(this);
    this.registerPage = this.registerPage.bind(this);
  }
  teacherPage()
  {
    this.setState({gotoAnotherPage: 1});
  }
  studentPage()
  {
    this.setState({gotoAnotherPage: 2});
  }
  homePage()
  {
    this.setState({gotoAnotherPage: null});
  }
  loginPage()
  {
    browserHistory.push('#/login/'+this.state.gotoAnotherPage);
    window.location.reload();
  }
  registerPage()
  {
    browserHistory.push('#/register/'+this.state.gotoAnotherPage);
    window.location.reload();
  }
  render() {
    // Render either the Log In and register buttons, or the logout button
    // based on the current authentication state.
    const navButtons = this.props.loggedIn ? (
        <div>
          {this.props.currentlySending ? (
            <LoadingButton className="btn--nav" />
          ) : (
            <a href="#" className="btn btn--login btn--nav" onClick={this._logout}>Logout</a>
          )}
        </div>
      ) : (      
        <div>
          {
            this.state.gotoAnotherPage?
            <div>
            <Link to={"/login/"+this.state.gotoAnotherPage} className="btn btn--login btn--nav">LOGIN</Link>
            <Link to={"/register/"+this.state.gotoAnotherPage} className="btn btn--login btn--nav">REGISTER</Link>
            </div>:
            <div>
          <Link to="/login/1" className="btn btn--login btn--nav" onClick={this.teacherPage}>TEACHER</Link>
          <Link to="/login/2" className="btn btn--login btn--nav" onClick={this.studentPage}>STUDENT</Link>
          </div>
          }
        </div>
      );

    return(
      <div className="nav">
        <div className="nav__wrapper">
          <Link to="/" className="nav__logo-wrapper" onClick={this.homePage}><h1 className="nav__logo">UNIVERSITY</h1></Link>
          { navButtons }
        </div>
      </div>
    );
  }

  _logout() {
    this.props.dispatch(logout());
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  currentlySending: React.PropTypes.bool.isRequired
}

export default Nav;
