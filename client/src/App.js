import React, {Component} from 'react';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import CreateCourse from './components/CreateCourse.js';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import UpdateCourse from './components/UpdateCourse.js';
import UserSignUp from './components/UserSignUp.js';
// import './App.css';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div id="root">
            {/* TODO: Do redirect from root path to /courses */}
            <Route exact path="/courses" component={Courses} />
            <Route path="/courses/detail/:id" component={CourseDetail} />
            <Route path="/courses/update/:id" component={UpdateCourse} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/user/signup" component={UserSignUp} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
