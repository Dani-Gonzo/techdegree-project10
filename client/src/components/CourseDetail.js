import React, {Component} from 'react';
import { Link } from 'react-router-dom';

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
          .then(res => res.json())
          .then(resData => {
            this.setState({
              courseData: resData
            })
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
        let materials = null;
        let authUserDisplay;
        
        if (courseData.materialsNeeded != null) {
            materials = courseData.materialsNeeded.split("\n").map(material => {
                return (
                    <li>{material.replace("*", "")}</li>
                )
            });
        }

        if (context.authenticatedUser != null && context.authenticatedUser.id === courseData.user.id) {
            authUserDisplay = <span>
                                <Link className="button" to={`/courses/${courseData.id}/update`}>Update Course</Link>
                                <Link className="button" onClick={() => this.courseDelete(this.props.match.params.id)} to="#">Delete Course</Link>
                            </span>
        } else {
            authUserDisplay = null;
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
                            <h3 className="course--title">{courseData.title}</h3>
                            <p>By {courseData.user.firstName} {courseData.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <p>{courseData.description}</p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{courseData.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {materials}
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