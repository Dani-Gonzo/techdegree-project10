import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="bounds">
        <h1>Oh no!</h1>
        <p>Sorry! Something went wrong on our end :(</p>
        <div className="grid-100">
            <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
    </div>
);