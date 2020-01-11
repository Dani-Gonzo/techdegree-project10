import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Consumer} from './Context';

export default class Header extends Component {
    render() {


        return (
            <Consumer>
                {context => {
                    const authUser = context.authenticatedUser;
                    return (
                    <div className="header">
                        <div className="bounds">
                            <h1 className="header--logo">Courses</h1>
                            <nav>
                                {/* <Link className="signup" to="signup">Sign Up</Link>
                                <Link className="signin" to="/signin">Sign In</Link> */}
                                {
                                    authUser ?
                                        <React.Fragment>
                                            <span>Welcome, {authUser.firstName} {authUser.lastName}</span>
                                            <Link to="/signout">Sign Out</Link>
                                        </React.Fragment>
                                    :
                                        <React.Fragment>
                                            <Link className="signup" to="/signup">Sign Up</Link>
                                            <Link className="signin" to="/signin">Sign In</Link>
                                        </React.Fragment>
                                }
                            </nav>
                        </div>
                    </div>                             
                    )
               
                }}

            </Consumer>
        )
    }
}