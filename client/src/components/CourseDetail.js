import React, {Component} from 'react';

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

    // TODO: Test AFTER making create course work
    courseDelete() {
        fetch(`//localhost:5000/api/courses/${this.props.match.params.id}`, {method: 'DELETE'})
            .then(() => window.alert("Hey Listen"));
    }

    // TODO: Build out after making update course component
    courseUpdate() {
        fetch(`//localhost:5000/api/courses/${this.props.match.params.id}`, {method: 'PUT'})
            .then(() => window.alert("Hey Listen"));
    }

    render() {
        const courseData = this.state.courseData;

        const materials = courseData.materialsNeeded.split("\n").map(material => {
            return (
                <li>{material.replace("*", "")}</li>
            )
        });

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100"><span><a className="button" onClick={this.courseUpdate} href="update-course.html">Update Course</a><a className="button" onClick={this.courseDelete} href="#">Delete Course</a></span><a
                        className="button button-secondary" href="/courses">Return to List</a></div>
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
                    <div class="grid-25 grid-right">
                        <div class="course--stats">
                            <ul class="course--stats--list">
                                <li class="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{courseData.estimatedTime}</h3>
                                </li>
                                <li class="course--stats--list--item">
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