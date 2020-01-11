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
        fetch(`//localhost:5000/api/courses/${this.props.match.params.id}`)
          .then(res => res.json())
          .then(resData => {
            this.setState({
              id: resData.id,
              title: resData.title,
              user: resData.user,
              description: resData.description,
              estimatedTime: resData.estimatedTime,
              materialsNeeded: resData.materialsNeeded
            })
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
            .then(() => this.props.history.push(`/courses/${this.state.id}`))
            .then(() => window.alert("Course updated!"))
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

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form onSubmit={this.courseUpdate}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>  
                                    <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.changeHandler} defaultValue={stateData.title}></input>
                                    <p>By {stateData.user.firstName} {stateData.user.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea id="description" name="description" className="" placeholder="Course description" onChange={this.changeHandler} defaultValue={stateData.description}>
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
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.changeHandler} defaultValue={stateData.estimatedTime}></input>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.changeHandler} defaultValue={stateData.materialsNeeded}></textarea>
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