/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import bcrypt from 'bcryptjs';
import { SET_AUTH, CHANGE_FORM, SENDING_REQUEST, SET_ERROR_MESSAGE, SET_INFO_MESSAGE } from '../constants/AppConstants';
import * as errorMessages  from '../constants/MessageConstants';
import auth from '../utils/auth';
import genSalt from '../utils/salt';
import { browserHistory } from 'react-router';

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function login(pos, data, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    console.log(data);
    if(pos == "teacher")
    {
      if (anyElementsEmpty({email: data.email, password: data.password})) {
        dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
        dispatch(sendingRequest(false));
        return;
      }  
    }
    if(pos == "student")
    {
      if (anyElementsEmpty({stdid: data.stdid, password: data.password, university_id: data.university_id})) {
        dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
        dispatch(sendingRequest(false));
        return;
      }  
    }
    // Generate salt for password encryption
    //const salt = genSalt(username);
    // Encrypt password
    // bcrypt.hash(password, salt, (err, hash) => {
    //   // Something wrong while hashing
    //   if (err) {
    //     dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
    //     return;
    //   }
      // Use auth.js to fake a request
      auth.login(pos, data, (success, err) => {
        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setAuthState(success));

        if (success === true) {
          // If the login worked, forward the user to the whiteboard and clear the form
          if(pos == "teacher")    
            forwardTo('#/'+sessionStorage.pos+'/'+sessionStorage.token);
          else
            forwardTo('#/'+sessionStorage.pos+'/'+data.university_id+'_'+sessionStorage.token);
          window.location.reload();
          dispatch(changeForm({
            stdid: "",
            email: "",
            name: "",
            password: ""
          }));
        } else {
          switch (err.type) {
            case 'permission-not-allowed':
              dispatch(setErrorMessage(errorMessages.PERMISSION_NOT_ALLOWED));
              return;
            case 'user-doesnt-exist':
              dispatch(setErrorMessage(errorMessages.USER_NOT_FOUND));
              return;
            case 'password-wrong':
              dispatch(setErrorMessage(errorMessages.WRONG_PASSWORD));
              return;
            case 'input-wrong':
              dispatch(setErrorMessage(errorMessages.WRONG_INPUT));
              return;
            default:
              dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
              return;
          }
        }
      });
    // });
  }
}

/**
 * Logs the current user out
 */
export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.logout((success, err) => {
      if (success === true) {
        dispatch(sendingRequest(false));
        dispatch(setAuthState(false));
        browserHistory.replace(null, '/');
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  }
}

/**
 * Registers a user
 * @param  {string} username The username of the new user
 * @param  {string} password The password of the new user
 */
export function register(data) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    console.log(data);
    // If no username or password was specified, throw a field-missing error
    if(data.pos == "teacher")
    {
      if (anyElementsEmpty({ data })) {
        dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
        dispatch(sendingRequest(false));
        return;
      }  
    }
    if(data.pos == "student")
    {
      if (anyElementsEmpty({ data })) {
        dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
        dispatch(sendingRequest(false));
        return;
      }  
    }
    // Generate salt for password encryption
    //const salt = genSalt(username);
    // Encrypt password
    //bcrypt.hash(password, salt, (err, hash) => {
      // Something wrong while hashing
      // if (err) {
      //   dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      //   return;
      // }
      // Use auth.js to fake a request
      auth.register(data, (success, err) => {
        // When the request is finished, hide the loading indicator
        
        dispatch(sendingRequest(false));
        dispatch(setAuthState(success));
        if (success) {
          // If the register worked, forward the user to the homepage and clear the form
          dispatch(setErrorMessage(errorMessages.SUCCESSFUL_REGISTER));
          setTimeout(() => {
            forwardTo('#/');
            window.location.reload();
          }, 2000);
          
          dispatch(changeForm({
            stdid: "",
            email: "",
            name: "",
            password: ""
          }));
        } else {
          switch (err.type) {
            case 'username-exists':
              dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
              return;
            case 'permission-not-allowed':
              dispatch(setErrorMessage(errorMessages.PERMISSION_NOT_ALLOWED));
              return;
            default:
              dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
              return;
          }
        }
      });
    // });
  }
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
  return { type: CHANGE_FORM, newState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}


/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
  return (dispatch) => {
    let type = message == errorMessages.SUCCESSFUL_REGISTER?SET_INFO_MESSAGE:SET_ERROR_MESSAGE;
    dispatch({ type: type, message });

    const form = document.querySelector('.form-page__form-wrapper');
    if (form) {
      form.classList.add(type == SET_ERROR_MESSAGE?'js-form__err-animation':'js-form__info-animation');
      // Remove the animation class after the animation is finished, so it
      // can play again on the next error
      setTimeout(() => {
        form.classList.remove(type == SET_ERROR_MESSAGE?'js-form__err-animation':'js-form__info-animation');
      }, 150);

      // Remove the error message after 3 seconds
      setTimeout(() => {
        dispatch({ type: SET_ERROR_MESSAGE, message: '' });
      }, 3000);
    }
  }
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
  browserHistory.push(location);
}


/**
 * Checks if any elements of a JSON object are empty
 * @param  {object} elements The object that should be checked
 * @return {boolean}         True if there are empty elements, false if there aren't
 */
function anyElementsEmpty(elements) {
  for (let element in elements) {
    if (!elements[element]) {
      return true;
    }
  }
  return false;
}
