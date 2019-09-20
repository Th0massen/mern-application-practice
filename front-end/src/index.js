import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import LandingPage from './Containers/LandingPage';
import LoginPage from './Containers/LoginPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Route exact path="/" component={ LandingPage }/>
            <Route path="/login" component={ LoginPage } />
        </App>
    </BrowserRouter>
    ,document.getElementById('root')
);

serviceWorker.unregister();
