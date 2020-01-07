import React, {Component} from 'react';
import {Consumer} from './Context';

export default class UserSignUp extends Component {
    
    render() {
        return (
            <Consumer>
                {context => {
                    const cancelButton = e => {
                        e.preventDefault();
                        let path = "/courses";
                        this.props.history.push(path);
                    }

                    let errors = [];
                    let errorContainer;

                    if (context.user.errors.length > 0) {
                        errors = context.users.errors.map(error => {
                            return (
                                <li>{error}</li>
                            )
                        });
                    }

                    if (context.user.errors.length > 0) {
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
                                    <form onSubmit={context.actions.createUser}>
                                        <div>
                                            <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={context.actions.changeHandler}></input> 
                                        </div>
                                        <div>
                                            <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={context.actions.changeHandler}></input> 
                                        </div>
                                        <div>
                                            <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={context.actions.changeHandler}></input> 
                                        </div>
                                        <div>
                                            <input id="password" name="password" type="text" className="" placeholder="Password" onChange={context.actions.changeHandler}></input> 
                                        </div>
                                        <div>
                                            <input id="confirmPassword" name="confirmPassword" type="text" className="" placeholder="Confirm Password" onChange={context.actions.changeHandler}></input> 
                                        </div>
                                        <div className="grid-100 pad-bottom">
                                            <button className="button" type="submit">Sign Up</button>
                                            <button className="button button-secondary" onClick={cancelButton}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                                <p>&nbsp;</p>
                                <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p> {/* TODO: Link to user sign in route */}
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}