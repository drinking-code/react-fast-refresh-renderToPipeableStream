import React, {Fragment} from 'react';
import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Page from './pages/Page'

export default function App() {
    return (
        <Fragment>
            <header>Header</header>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/page' element={<Page/>}/>
            </Routes>
        </Fragment>
    )
}
