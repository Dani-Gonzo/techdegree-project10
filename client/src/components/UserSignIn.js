import React, {Component} from 'react';
import {Consumer} from './Context'; 


export default class UserSignIn extends Component {

    state = {
        emailAddress: "",
        password: "",
        errors: []
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
        return (
            <Consumer> 
            { context => {
                const handleSubmit = e => {
                    e.preventDefault();
                    context.actions.signIn(this.state.emailAddress, this.state.password)
                        .then(user => {
                            if (user === null) {
                                this.setState(() => {
                                    return {errors: ["Sign-in was unsuccessful"]};
                                });
                            } else {
                                this.props.history.push("/courses");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this.props.history.push("/error");
                        })
                    }
                    return (
                        <div className="bounds">
                            <div className="grid-33 centered signin">
                                <h1>Sign In</h1>
                                <div>
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
                                <p>Don't have a user account? <a href="/user/signup">Click here</a> to sign up!</p>
                            </div>
                        </div>
                    )
                }
            } 
            </Consumer>
        )
    }
}