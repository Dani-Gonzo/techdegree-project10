import React, {Component} from 'react';
import Cookies from "js-cookie";

const UserContext = React.createContext();

export class Provider extends Component {
    state = {
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

    signIn = async (emailAddress, password) => {
        const user = await this.getUser(emailAddress, password);
        if (user !== null) {
            user.password = password;
            this.setState(() => {
                return {
                    authenticatedUser: user
                };
            });
            Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
        }
        return user;
    }

    getUser = async (emailAddress, password) => {
        const res = await fetch('//localhost:5000/api/users', {headers: new Headers({"Content-Type": "application/json", "Authorization": "Basic " + btoa(emailAddress + ":" + password)})});
        if (res.ok) {
            return res.json();
        } else if (res.status === 401) {
            return null;
        } else if (res.status === 500) {
            this.props.history.push('/error');
        }
    }

    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null
            };
        });
        Cookies.remove("authenticatedUser");
    }
}

export const Consumer = UserContext.Consumer;