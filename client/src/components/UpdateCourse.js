import React, {Component} from 'react';

export default class UpdateCourse extends Component {
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

    courseUpdate = e => {
        e.preventDefault();
        fetch(`//localhost:5000/api/courses/${this.props.match.params.id}`, {
            method: 'PUT', body: JSON.stringify(this.state.courseData)})
            .then(() => this.props.history.push(`/courses/detail/${this.state.courseData.id}`))
            .then(() => window.alert("Course updated!"))
    }

    changeHandler = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value})
    }

    cancelButton = e => {
        e.preventDefault();
        let path = `/courses/detail/${this.state.courseData.id}`;
        this.props.history.push(path);
    }

    render() {
        const courseData = this.state.courseData;

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form onSubmit={this.courseUpdate}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>  
                                    <input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..." onChange={this.changeHandler} defaultValue={courseData.title}></input>
                                    <p>By {courseData.user.firstName} {courseData.user.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea id="description" name="description" class="" placeholder="Course description" defaultValue={courseData.description}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input" placeholder="Hours" defaultValue={courseData.estimatedTime}></input>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" class="" placeholder="List materials..." defaultValue={courseData.materialsNeeded}></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary" onClick={this.cancelButton}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}