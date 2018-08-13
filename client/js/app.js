import React from 'react';
import {render} from 'react-dom';

import { CSSTransitionGroup } from 'react-transition-group'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { homeReducer } from './reducers/reducers';
import FontFaceObserver from 'fontfaceobserver';

import Shell from './Shell';
import CourseHome from './CourseHome';
import CourseRecord from './CourseRecord';
import CourseView from './CourseView';
import CourseFormWrapper from './CourseFormWrapper';
import HomeworkRecord from './HomeworkRecord';
import HomeworkView from './HomeworkView';
import HomeworkFormWrapper from './HomeworkFormWrapper';
import StudentHome from './StudentHome';
import StudentRecord from './StudentRecord';
import StudentView from './StudentView';
import StudentFormWrapper from './StudentFormWrapper';
import TeacherHome from './TeacherHome';
import TeacherRecord from './TeacherRecord';
import TeacherView from './TeacherView';
import TeacherFormWrapper from './TeacherFormWrapper';
import UniversityHome from './UniversityHome';
import ChatHome from './ChatHome';

// Import the components used as pages
import HomePage from './pages/HomePage.react';
import TeacherPage from './pages/TeacherPage.react';
import StudentPage from './pages/StudentPage.react';
import LoginPage from './pages/LoginPage.react';
import RegisterPage from './pages/RegisterPage.react';
import NotFound from './pages/NotFound.react';
import App from './App.react';

// Import the CSS file, which webpack transfers to the build folder
//import '../css/main.css';

const openSansObserver = new FontFaceObserver;

openSansObserver.load('Open Sans').then(() => {
  document.body.classList.add('js-open-sans-loaded');
}, (err) => {
  document.body.classList.remove('js-open-sans-loaded');
});

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);

function checkAuth(nextState, replaceState) {
  let { loggedIn } = store.getState();
  return loggedIn;
  // check if the path isn't dashboard
  // that way we can apply specific logic
  // to display/render the path we want to
  // if (nextState.location.pathname !== '/student') {
  //   if (loggedIn) {
  //     if (nextState.location.state && nextState.location.pathname) {
  //       replaceState(null, nextState.location.pathname);
  //     } else {
  //       replaceState(null, '/');
  //     }
  //   }
  // } else {
  //   // If the user is already logged in, forward them to the homepage
    
  //   if (!loggedIn) {
  //     if (nextState.location.state && nextState.location.pathname) {
  //       replaceState(null, nextState.location.pathname);
  //     } else {
  //       replaceState(null, '/');
  //     }
  //   }
  // }
}
const Routesz = (store) => {
  const GuestRoute = () => (
    <Route component={App}>
        <IndexRoute component={HomePage} />
        <Route>
            <Route path="login">
              <Route path=":pageId" component={LoginPage}/>
            </Route>
            <Route path="register">
              <Route path=":pageId" component={RegisterPage}/>
            </Route>
        </Route>
    </Route>
  )

  const MemberRoute = () => (
    <Route path="/" component={Shell}>
      {/* <IndexRoute component={StudentHome}/> */}
      {/* <IndexRoute component={TeacherHome}/>
      <Route path="students" component={StudentView}/> */}
      <Route path="student" component={StudentRecord}>
          <Route path=":studentId" component={StudentView}/>
          <Route path=":studentId/edit" component={StudentFormWrapper}/>
      </Route>
      {/* <Route path="courses" component={CourseHome}/> */}
      <Route path="course" component={CourseRecord}>
          <Route path=":courseId" component={CourseView}/>
          <Route path=":courseId/edit" component={CourseFormWrapper}/>
      </Route>
      <Route path="homework" component={HomeworkRecord}>
          <Route path=":homeworkId" component={HomeworkView}/>
          <Route path=":homeworkId/edit" component={HomeworkFormWrapper}/>
      </Route>
      <Route path="teachers" component={TeacherHome}/>
      <Route path="teacher" component={TeacherRecord}>
          <Route path=":teacherId" component={TeacherView}/>
          <Route path=":teacherId/edit" component={TeacherFormWrapper}/>
      </Route>
      <Route path="universities" component={UniversityHome}/>
    </Route>
    )

  const MainRoutes = () => (
    checkAuth()?
     MemberRoute()
     :GuestRoute()
  )

  return MainRoutes()
}
render((
  <Provider store={store}>
    <Router>
      <Route path="/">
        {Routesz()}
      </Route>
    </Router>
  </Provider>
),document.getElementById('app'));
