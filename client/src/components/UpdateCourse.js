import React, {Component} from 'react';

export default class UpdateCourse extends Component {
    state = {
        title: "",
        user: {},
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
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
            if (resData === undefined) {
                return;
            } else if (resData === null) {
                this.props.history.push('/notfound');
            } else if (context.authenticatedUser.id !== resData.user.id) {
                this.props.history.push('/forbidden');
            } else {
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
                if (res.ok === true) {
                    this.props.history.push(`/courses/${this.state.id}`);
                    window.alert("Course updated!");
                } else if (res.status === 500) {
                    this.props.history.push('/error');
                } else {
                    const errorData = await res.json();
                    this.setState({errors: errorData.message});
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
        let path = `/courses/${this.state.id}`;
        this.props.history.push(path);
    }

    render() {
        const stateData = this.state;
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