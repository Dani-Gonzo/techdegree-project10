import React, {Component} from 'react';
import Cookies from "js-cookie";

// Create a context object for components to subscribe to
const UserContext = React.createContext();

// Context container for user authenticated state, sign in and sign out functionality
export class Provider extends Component {
    state = {
        // Persist user's authenticated status using a cookie
        authenticatedUser: Cookies.getJSON("authenticatedUser") || null
    };

    render() {
        const {authenticatedUser} = this.state;

        const value = {
            authenticatedUser,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        };

        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        );
    }

    // If credentials are correct, sign user in and set them to authenticated
    signIn = async (emailAddress, password) => {
        const user = await this.getUser(emailAddress, password);
        if (user !== null) {
            // Password not returned from api, so set manually for access
            user.password = password;
            this.setState(() => {
                return {
                    authenticatedUser: user
                };
            });
            // Set a cookie for a successfully signed in user to persist authentication status
            Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
        }
        return user;
    }

    // Check existing user credentials from the api against entered credentials
    getUser = async (emailAddress, password) => {
        // Call users api to compare entered credentials against existing credentials in the api and grab the matching user information
        const res = await fetch('//localhost:5000/api/users', {headers: new Headers({"Content-Type": "application/json", "Authorization": "Basic " + btoa(emailAddress + ":" + password)})});
        // Parse response and error handling
        if (res.ok) {
            return res.json();
        // If unauthorized status, prevent sign in
        } else if (res.status === 401) {
            return null;
        // If internal server error, redirect to /error path to show friendly message
        } else if (res.status === 500) {
            this.props.history.push('/error');
        }
    }

    // Sign user out and remove them from the authenticatedUser state. Remove cookie
    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null
            };
        });
        // Remove authenticated status upon user sign out
        Cookies.remove("authenticatedUser");
    }
}

export const Consumer = UserContext.Consumer;