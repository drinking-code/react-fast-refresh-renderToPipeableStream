import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './App'

const routedApp = <BrowserRouter><App/></BrowserRouter>
ReactDOM.hydrate(routedApp, document.querySelector('#root'))
