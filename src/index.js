import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import Html from './Html'

const routedApp = <BrowserRouter><Html/></BrowserRouter>
const root = ReactDOMClient.hydrateRoot(document, routedApp)
