import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Consumer} from './components/Context';

export default ({component: Component, ...rest}) => {
    return (
        // Wrap Route in a Consumer so components in PrivateRoute tag have access to context
        <Consumer>
            {context => (
                <Route
                    {...rest}
                    // If user is authenticated, continue to destination. Otherwise, redirect to sign in form.
                    // Save path they were navigating to for later redirection after successful sign-in.
                    render={props => context.authenticatedUser ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: {from: props.location}
                        }} />
                    )
                    }
                />  
            )}
        </Consumer>
    )
}