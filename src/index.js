import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import App from './App'

const routedApp = <BrowserRouter><App/></BrowserRouter>
const root = ReactDOMClient.hydrateRoot(document.querySelector('#root'), routedApp)
