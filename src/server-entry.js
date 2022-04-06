import React from 'react';
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom/server'

import App from './App'

export default function serverEntry({url}, res) {
    const jsx = (
        <StaticRouter location={url}>
            <App/>
        </StaticRouter>
    )

    let resolve
    const promise = new Promise(r => resolve = r)

    const html = ReactDOMServer.renderToString(jsx)

    res.send(`<html lang="en">
<head>
    <script src="/app.js" defer></script>
    <title>Title</title>
</head>
<body>
    <div id="root">${html}</div>
</body>
</html>`)

    resolve()

    return promise
}
