import React from 'react';
import App from './App'

export default function Html() {
    return (
        <html lang="en">
        <head>
            <script src={'/app.js'}/>
            <title>Title</title>
        </head>
        <body>
        <div id="root">
            <App/>
        </div>
        </body>
        </html>
    )
}
