import React, {Component} from 'react';

export default class UserSignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        errors: []
    }

    createUser = e => {
        e.preventDefault();
        fetch("//localhost:5000/api/users/", {
            method: 'POST', body: JSON.stringify(this.state), headers: new Headers({"Content-Type": "application/json"})
        })
        .then(async res => {
            if (res.ok == true) {
                this.props.history.push("/courses");
                window.alert("User account created!");
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
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        {errorContainer}
                        <form onSubmit={this.createUser}>
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
                    <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p> {/* TODO: Link to user sign in route */}
                </div>
            </div>
        )
    }
}