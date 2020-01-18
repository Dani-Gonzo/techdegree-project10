import React, {Component} from 'react';

// UI and logic for updating course information
export default class UpdateCourse extends Component {
    // Render requires intitialization of user and errors
    state = {
        // Expected structure of state
        // title: "",
        user: 1, // default placeholder
        // description: "",
        // estimatedTime: "",
        // materialsNeeded: "",
        errors: []
    };

    componentDidMount() {
        const {context} = this.props;
        fetch(`//localhost:5000/api/courses/${this.props.match.params.id}`)
          .then(res => {
            if (res.status === 500) {
                this.props.history.push('/error');
            } else {
                return res.json();
            }
          })
          .then(resData => {
              // If nothing is returned from previous then, do not continue
            if (resData === undefined) {
                return;
            } else if (resData === null) {
                this.props.history.push('/notfound');
            } else if (context.authenticatedUser.id !== resData.user.id) {
                this.props.history.push('/forbidden');
            } else {
                // Fill form fields with existing information by setting state for the course
                this.setState({
                    id: resData.id,
                    title: resData.title,
                    user: resData.user,
                    description: resData.description,
                    estimatedTime: resData.estimatedTime,
                    materialsNeeded: resData.materialsNeeded
                })
            }
        })
    }

    // Verify logged in user has correct authorization before updating course
    courseUpdate = e => {
        const {context} = this.props;
        e.preventDefault();
        fetch(`//localhost:5000/api/courses/${this.props.match.params.id}`, {
            method: 'PUT', 
            body: JSON.stringify(this.state), 
            headers: new Headers({
                "Content-Type": "application/json", 
                "Authorization": "Basic " + btoa(context.authenticatedUser.emailAddress + ":" + context.authenticatedUser.password)
            })
        })
            .then(async res => {
                // If res ok, redirect to course detail page
                if (res.ok === true) {
                    this.props.history.push(`/courses/${this.state.id}`);
                    window.alert("Course updated!");
                // If 500 status, redirect to error path to display user friendly message
                } else if (res.status === 500) {
                    this.props.history.push('/error');
                // Otherwise, set the errors returned from the api into the errors array in state
                } else {
                    const errorData = await res.json();
                    this.setState({errors: errorData.message});
                }
            })

    }

    // Called each time a field in the form has a change and sets the new appropriate state
    changeHandler = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value})
    }

    // Cancel course update, redirect the user to the course detail page
    cancelButton = e => {
        e.preventDefault();
        let path = `/courses/${this.state.id}`;
        this.props.history.push(path);
    }

    render() {
        const stateData = this.state;
        let errors = [];
        let errorContainer;

        // If there are errors, create a list item for each one
        if (this.state.errors.length > 0) {
            errors = this.state.errors.map(error => {
                return (
                    <li>{error}</li>
                )
            });
        }

        // If there are errors, display them
        if (this.state.errors.length > 0) {
            errorContainer = <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        {errors}
                                    </ul>
                                </div>
                            </div>
        } else {
            errorContainer = null;
        }

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    {errorContainer}
                    <form onSubmit={this.courseUpdate}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>  
                                    <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.changeHandler} value={stateData.title}></input>
                                    <p>By {stateData.user.firstName} {stateData.user.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea id="description" name="description" className="" placeholder="Course description" onChange={this.changeHandler} value={stateData.description}>
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
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.changeHandler} value={stateData.estimatedTime}></input>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.changeHandler} value={stateData.materialsNeeded}></textarea>
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