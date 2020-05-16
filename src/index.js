import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from "react-router-dom"
import {createBrowserHistory} from 'history'

import './index.css'
import 'semantic-ui-css/semantic.min.css'

import App from './App'

const history = createBrowserHistory()

ReactDOM.render((
        <Router history={history}>
            <App/>
        </Router>
    ), document.getElementById('root')
);
