import React, {Component} from 'react';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
// import './App.css';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div id="root">
            {/* TODO: Do redirect from root path to /courses */}
            <Route exact path="/courses" component={Courses} />
            <Route path="/courses/:id" component={CourseDetail} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
