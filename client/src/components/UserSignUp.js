import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// UI and logic for new user sign up
export default class UserSignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        errors: []
    }

    // Verify "password" and "confirmPassword" fields match before attempting to create a new user
    checkPassword = e => {
        e.preventDefault();
        if (this.state.confirmPassword === this.state.password) {
            this.createUser();
        } else {
            this.setState({errors: ['Make sure the "Password" and "Confirm Password" fields match.']});
        }
    }

    // Make a post request to the user api to create a new user and add to the database
    createUser = e => {
        fetch("//localhost:5000/api/users/", {
            method: 'POST', body: JSON.stringify(this.state), headers: new Headers({"Content-Type": "application/json"})
        })
        .then(async res => {
            // If sign up is successful, redirect user to main courses route
            if (res.ok === true) {
                this.props.history.push("/");
                window.alert("User account created!");
            // If 500 status, redirect to error path to display friendly error message
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

    // Cancel sign up, redirect the user to the main courses page
    cancelButton = e => {
        e.preventDefault();
        let path = "/";
        this.props.history.push(path);
    }

    render() {
        let errors = [];
        let errorContainer;

        // If there are errors, create a list item for each one
        if (this.state.errors.length > 0) {
            errors = this.state.errors.map((error, index) => {
                return (
                    <li key={index}>{error}</li>
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

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        {errorContainer}
                        <form onSubmit={this.checkPassword}>
                            <div>
                                <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.changeHandler}></input> 
                            </div>
                            <div>
                                <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.changeHandler}></input> 
                            </div>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.changeHandler}></input> 
                            </div>
                            <div>
                                <input id="password" name="password" type="text" className="" placeholder="Password" onChange={this.changeHandler}></input> 
                            </div>
                            <div>
                                <input id="confirmPassword" name="confirmPassword" type="text" className="" placeholder="Confirm Password" onChange={this.changeHandler}></input> 
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary" onClick={this.cancelButton}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}