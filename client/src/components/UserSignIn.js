import React, {Component} from 'react';
import {Consumer} from './Context'; 
import { Link } from 'react-router-dom';

// UI and logic for user sign in
export default class UserSignIn extends Component {
    state = {
        emailAddress: "",
        password: "",
        errors: []
    }

    // Called each time a field in the form has a change and sets the new appropriate state
    changeHandler = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value})
    }

    // Cancel sign in, redirect the user to the main courses page
    cancelButton = e => {
        e.preventDefault();
        let path = "/";
        this.props.history.push(path);
    }

    render() {
        return (
            <Consumer> 
            { context => {
                // Submit handler in render for context purposes
                const handleSubmit = e => {
                    e.preventDefault();
                    // If user was attempting to reach a certain page, redirect them upon sign-in. Otherwise, go to course list
                    const {from} = this.props.location.state || {from: {pathname: '/'}};

                    // Call sign in method from context
                    context.actions.signIn(this.state.emailAddress, this.state.password)
                        .then(user => {
                            // If user is null, set error state message
                            if (user === null) {
                                this.setState(() => {
                                    return {errors: ["Sign-in was unsuccessful"]};
                                });
                            } 
                            // Otherwise redirect them to the previously desired page (accessed from PrivateRoute component)
                            else {
                                this.props.history.push(from);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this.props.history.push("/error");
                        })
                }

                let errorContainer;

                // If there is an error (ie sign in was unsuccessful), display it
                if (this.state.errors.length > 0) {
                    errorContainer = <div>
                                        <h2 className="validation--errors--label">Validation errors</h2>
                                        <div className="validation-errors">
                                            <ul>
                                                <li>
                                                    {this.state.errors}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                } else {
                    errorContainer = null;
                }

                    return (
                        <div className="bounds">
                            <div className="grid-33 centered signin">
                                <h1>Sign In</h1>
                                <div>
                                    {errorContainer}
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.changeHandler}></input>
                                        </div>
                                        <div>
                                            <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.changeHandler}></input>
                                        </div>
                                        <div className="grid-100 pad-bottom">
                                            <button className="button" type="submit">Sign In</button>
                                            <button className="button button-secondary" onClick={this.cancelButton}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                                <p>&nbsp;</p>
                                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                            </div>
                        </div>
                    )
                }
            } 
            </Consumer>
        )
    }
}