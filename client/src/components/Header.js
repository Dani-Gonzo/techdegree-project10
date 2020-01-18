import React from 'react';
import { Link } from 'react-router-dom';
import {Consumer} from './Context';

// Main header for the entire app
// Display different information based on whether the user is logged in or not
export default () => (
    <Consumer>
        {context => {
            const authUser = context.authenticatedUser;
            return (
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                            {/* If user is authenticated, display Welcome message and sign out link. 
                            Otherwise, display sign up and sign in links */}
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
);