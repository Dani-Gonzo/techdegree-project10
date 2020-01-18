import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import {Provider} from './components/Context';

ReactDOM.render(
    <Provider>
        <App />
    </Provider>, 
    document.getElementById('root'));