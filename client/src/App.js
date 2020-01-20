import React, {Component} from 'react';
import {Consumer} from './components/Context';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import CreateCourse from './components/CreateCourse.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UpdateCourse from './components/UpdateCourse.js';
import UserSignUp from './components/UserSignUp.js';
import UserSignIn from './components/UserSignIn.js';
import UserSignOut from './components/UserSignOut.js';
import Header from './components/Header.js';
import PrivateRoute from './PrivateRoute.js';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';

// Wraps components in a Consumer so they can more easily access what they need from the Provider
function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Consumer>
        {context => <Component {...props} context={context} />}
      </Consumer>
    );
  }
}

// Components with Context
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div id="root">
            <Header />

            <Switch>
              <Route exact path="/" component={Courses} />
              <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
              <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
              <Route path="/courses/:id" component={CourseDetailWithContext} />
              <Route path="/signup" component={UserSignUpWithContext} />
              <Route path="/signin" component={UserSignIn} />
              <Route path="/signout" component={UserSignOut} />
              <Route path="/forbidden" component={Forbidden} />
              <Route path="/error" component={UnhandledError} />
              <Route path="/notfound" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
