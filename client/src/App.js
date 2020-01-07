import React, {Component} from 'react';
import {Provider} from './components/Context';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import CreateCourse from './components/CreateCourse.js';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import UpdateCourse from './components/UpdateCourse.js';
import UserSignUp from './components/UserSignUp.js';
// import './App.css';

class App extends Component {
  
  state = {
    user: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      errors: []
    }
  }

  createUser = e => {
    e.preventDefault();
    fetch("//localhost:5000/api/users/", {
        method: 'POST', body: JSON.stringify(this.state.user), headers: new Headers({"Content-Type": "application/json"})
    })
    .then(async res => {
        if (res.ok == true) {
            this.props.history.push("/courses");
            window.alert("User account created!");
        } else {
            const errorData = await res.json();
            this.setState({errors: errorData.message})
        }
    })
  }

  changeHandler = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value})
  }

  render() {
    return (
      <Provider value={{
        user: this.state.user,
        actions: {
          createUser: this.createUser,
          changeHandler: this.changeHandler
        }
      }}>
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
      </Provider>
    )
  }
}

export default App;
