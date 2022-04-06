import React from 'react';
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom/server'

import Html from './Html'

export default function serverEntry({url}, res) {
    const jsx = (
        <StaticRouter location={url}>
            <Html/>
        </StaticRouter>
    )

    let resolve
    const promise = new Promise(r => resolve = r)

    const html = ReactDOMServer.renderToString(jsx)
    res.send(html)
    resolve()

    return promise
}
