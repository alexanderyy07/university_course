/**
 * Form.react.js
 *
 * The form with a username and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component } from 'react';
import { changeForm } from './actions/AppActions';
import LoadingButton from './LoadingButton.react';
import ErrorMessage from './ErrorMessage.react';

import * as UniversityService from './services/UniversityService';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class RegisterForm extends Component {
  constructor(props) {
		super(props);

		this.state = {
      showTeacher: props.pos=="teacher",
      universities: []
    };
    this.getUniversities();
  }
  getUniversities()
  {
    UniversityService.findAll().then(universities => this.setState({universities}));
  }
  render() {
    let rows = [];
    for(let i=0;i<this.state.universities.length;i++)
      rows.push(<option value = {this.state.universities[i]['code']}>{this.state.universities[i]['name']}</option>);
      
    return(
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <ErrorMessage />
        {
          this.state.showTeacher?
            <div>
              <div className="form__field-wrapper" id="teacher_form">
                <label className="form__field-label" htmlFor="university">University</label>
                <select className="form__field-input" id="university" value={this.props.data.university} onChange={this._changeUniversity.bind(this)}>
                  {rows}
                </select>
              </div>
              <div className="form__field-wrapper" id="teacher_form">
                <label className="form__field-label" htmlFor="email">Department</label>
                <input className="form__field-input" type="text" id="department" value={this.props.data.department} onChange={this._changeDepartment.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
              </div>
            </div>:
            null
        }
        {
          this.state.showTeacher?
            <div className="form__field-wrapper" id="teacher_form">
            <label className="form__field-label" htmlFor="email">Email Address</label>
              <input className="form__field-input" type="text" id="email" value={this.props.data.email} onChange={this._changeEmail.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
            </div>
            :
            <div>
            <div className="form__field-wrapper" id="student_form">
              <label className="form__field-label" htmlFor="stdid">Student ID</label>
              <input className="form__field-input" type="text" id="stdid" value={this.props.data.stdid} onChange={this._changeStdid.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
            </div>
            <div className="form__field-wrapper" id="student_form">
              <label className="form__field-label" htmlFor="course_id">Course ID</label>
              <input className="form__field-input" type="text" id="course_id" value={this.props.data.course_id} onChange={this._changeCourseid.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
            </div>
            </div>
        }
        <div className="form__field-wrapper">
          <label className="form__field-label" htmlFor="name">Name</label>
          <input className="form__field-input" type="text" id="name" value={this.props.data.name} onChange={this._changeUsername.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        </div>
        <div className="form__field-wrapper">
          <label className="form__field-label" htmlFor="password">Password</label>
          <input className="form__field-input" id="password" type="password" value={this.props.data.password} onChange={this._changePassword.bind(this)} />
        </div>
        <div className="form__submit-btn-wrapper">
          {this.props.currentlySending ? (
            <LoadingButton />
          ) : (
            <button className="form__submit-btn" type="submit">{this.props.btnText}</button>
          )}
        </div>
      </form>
    );
  }
  // Change the position in the app state
  _changeUniversity(evt) {
    var newState = this._mergeWithCurrentState({
      university: evt.target.value
    });
    this._emitChange(newState);
  }
  // Change the position in the app state
  _changeDepartment(evt) {
    var newState = this._mergeWithCurrentState({
      department: evt.target.value
    });
    this._emitChange(newState);
  }
  // Change the position in the app state
    _changePos(evt) {
      var newState = this._mergeWithCurrentState({
        pos: evt.target.value
      });
      this.setState({showTeacher: evt.target.value == "teacher"});
      this._emitChange(newState);
    }
  // Change the Student ID in the app state
    _changeStdid(evt) {
      var newState = this._mergeWithCurrentState({
        stdid: evt.target.value
      });
  
      this._emitChange(newState);
    }
    _changeCourseid(evt) {
      var newState = this._mergeWithCurrentState({
        course_id: evt.target.value
      });
  
      this._emitChange(newState);
    }
    // Change the email in the app state
  _changeEmail(evt) {
      var newState = this._mergeWithCurrentState({
        email: evt.target.value
      });
  
      this._emitChange(newState);
    }
  // Change the username in the app state
  _changeUsername(evt) {
    var newState = this._mergeWithCurrentState({
      name: evt.target.value
    });

    this._emitChange(newState);
  }

  // Change the password in the app state
  _changePassword(evt) {
    var newState = this._mergeWithCurrentState({
      password: evt.target.value
    });

    this._emitChange(newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState(change) {
    return assign(this.props.data, change);
  }

  // Emits a change of the form state to the application state
  _emitChange(newState) {
    this.props.dispatch(changeForm(newState));
  }

  // onSubmit call the passed onSubmit function
  _onSubmit(evt) {
    evt.preventDefault();
    this._mergeWithCurrentState({
      pos: this.props.pos
    });
    if(this.props.data.university == null)
      this.props.data.university = 1;
    this.props.onSubmit(this.props.data);
  }
}

RegisterForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  btnText: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired
}

export default RegisterForm;
