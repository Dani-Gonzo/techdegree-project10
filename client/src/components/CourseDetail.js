import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// Call course api upon component mount and render details about a specific course
export default class CourseDetail extends Component {
    state = {
        // Expected structure of state
        courseData: {
            // title: "",
            // Render requires initialization of user
            user: {},
            // materialsNeeded: ""
        }
    }

    componentDidMount() {
        // Call courses api using the id of the desired course to grab details to display
        fetch(`//localhost:5000/api/courses/${this.props.match.params.id}`)
          .then(res => {
            // Handle server error, otherwise parse response
            if (res.status === 500) {
                this.props.history.push('/error');
            } else {
                return res.json();
            }
          })
          .then(resData => {
            // If course does not exist, route to /notfound to display friendly not found message
            // Otherwise, set the state to the course details
            if (resData === null) {
                this.props.history.push('/notfound');
            } else {
                this.setState({
                    courseData: resData
                })
            }
        })
    }

    // Verify logged in user has permissions before deleting course
    courseDelete(id) {
        const {context} = this.props;
        fetch(`//localhost:5000/api/courses/${id}`, {
            method: 'DELETE', 
            headers: new Headers({
                "Authorization": "Basic " + btoa(context.authenticatedUser.emailAddress + ":" + context.authenticatedUser.password)
            })
        })
            .then(res => {
                // If ok, show alert and redirect user to main courses page
                if (res.ok === true) {
                    this.props.history.push('/');
                    window.alert("Delete successful!");
                // If internal server error, redirect to /error path to show friendly message
                } else if (res.status === 500) {
                    this.props.history.push('/error');
                } else {
                    window.alert("Sorry, could not delete the course!");
                }
            })
    }

    render() {
        const {context} = this.props;
        const courseData = this.state.courseData;
        let authUserDisplay;
        let title;
        let userFirst;
        let userLast;
        let description;
        let estimatedTime;
        let materialsNeeded;

        // If courseData exists, set variables to matching state item
        if (courseData !== null) {
            title = courseData.title;
            userFirst = courseData.user.firstName;
            userLast = courseData.user.lastName;
            description = courseData.description;
            estimatedTime = courseData.estimatedTime;
            materialsNeeded = courseData.materialsNeeded;
            // Verify logged in user id matches course owner id and display course control buttons if they match
            if (context.authenticatedUser != null && context.authenticatedUser.id === courseData.user.id) {
                authUserDisplay = <span>
                                <Link className="button" to={`/courses/${courseData.id}/update`}>Update Course</Link>
                                <Link className="button" onClick={() => this.courseDelete(this.props.match.params.id)} to="#">Delete Course</Link>
                            </span>
            // If IDs do not match, do not display course control buttons
            } else {
                authUserDisplay = null;
            }
        }

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {authUserDisplay}
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                            <p>By {userFirst} {userLast}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown source={materialsNeeded} />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}