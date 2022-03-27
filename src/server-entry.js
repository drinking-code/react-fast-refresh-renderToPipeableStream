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

    const {pipe, abort} = ReactDOMServer.renderToPipeableStream(jsx, {
        onShellReady() {
            res.statusCode = 200
            res.setHeader('Content-type', 'text/html')
            pipe(res)
            resolve()
        },
        onError(err) {
            console.error(err)
        }
    })

    return promise
}
