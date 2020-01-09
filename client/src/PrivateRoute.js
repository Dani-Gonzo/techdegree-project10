import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Consumer} from './components/Context';

export default ({component: Component, ...rest}) => {
    return (
        <Consumer>
            
        </Consumer>
    )
}