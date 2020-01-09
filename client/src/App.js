import React, {Component} from 'react';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import CreateCourse from './components/CreateCourse.js';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import UpdateCourse from './components/UpdateCourse.js';
import UserSignUp from './components/UserSignUp.js';
import UserSignIn from './components/UserSignIn.js';
import UserSignOut from './components/UserSignOut.js';
import Header from './components/Header.js';
// import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div id="root">
            <Header />
            
            <Route exact path="/" component={Courses} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="signout" component={UserSignOut} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
