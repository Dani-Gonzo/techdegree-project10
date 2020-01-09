import React, {Component} from 'react';

export default class CreateCourse extends Component {
    state = {
        title: "",
        user: {
            id: 1,
            firstName: "Joe",
            lastName: "Smith"
        },
        userId: 1,
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: []
    }

    courseCreate = e => {
        e.preventDefault();
        fetch("//localhost:5000/api/courses/", {
            method: 'POST', body: JSON.stringify(this.state), headers: new Headers({"Content-Type": "application/json", "Authorization": "Basic am9lQHNtaXRoLmNvbTpqb2VwYXNzd29yZA=="})})
            .then(async res => {
                if (res.ok == true) {
                    this.props.history.push("/courses/");
                    window.alert("Course created!");
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

    cancelButton = e => {
        e.preventDefault();
        let path = "/courses";
        this.props.history.push(path);
    }

    render() {
        let errors = [];
        let errorContainer;

        if (this.state.errors.length > 0) {
            errors = this.state.errors.map(error => {
                return (
                    <li>{error}</li>
                )
            });
        }

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

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {errorContainer}
                    <form onSubmit={this.courseCreate}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.changeHandler}></input>
                                </div>
                                {/* Fill in currently logged in user name? */}
                                <p>By Xxxx Xxxx</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.changeHandler}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.changeHandler}></input>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.changeHandler}></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="grid-100 pad-bottom">
                            <button class="button" type="submit">Create Course</button>
                            <button class="button button-secondary" onClick={this.cancelButton}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}