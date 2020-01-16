import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
    state = {
        courseData: {
            title: "",
            user: {},
            materialsNeeded: ""
        }
    }

    componentDidMount() {
        fetch(`//localhost:5000/api/courses/${this.props.match.params.id}`)
          .then(res => {
            if (res.status === 500) {
                this.props.history.push('/error');
            } else {
                return res.json();
            }
          })
          .then(resData => {
            if (resData === null) {
                this.props.history.push('/notfound');
            } else {
                this.setState({
                    courseData: resData
                })
            }
        })
    }

    courseDelete(id) {
        const {context} = this.props;
        fetch(`//localhost:5000/api/courses/${id}`, {
            method: 'DELETE', 
            headers: new Headers({
                "Authorization": "Basic " + btoa(context.authenticatedUser.emailAddress + ":" + context.authenticatedUser.password)
            })
        })
            .then(() => {   
                this.props.history.push('/');
                window.alert("Delete successful!");
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

        if (courseData !== null) {
            title = courseData.title;
            userFirst = courseData.user.firstName;
            userLast = courseData.user.lastName;
            description = courseData.description;
            estimatedTime = courseData.estimatedTime;
            materialsNeeded = courseData.materialsNeeded;
            if (context.authenticatedUser != null && context.authenticatedUser.id === courseData.user.id) {
                authUserDisplay = <span>
                                <Link className="button" to={`/courses/${courseData.id}/update`}>Update Course</Link>
                                <Link className="button" onClick={() => this.courseDelete(this.props.match.params.id)} to="#">Delete Course</Link>
                            </span>
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