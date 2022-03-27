const express = require('express')
const render = require('./render')

const app = express()

app.use(express.static('public'))
app.use(express.static('dist'))

if (process.env.NODE_ENV === 'development') {
    process.env.APP_ENV = 'browser'
    const webpackConfig = require('./webpack.config')

    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack({
        ...webpackConfig,
        stats: 'errors-only'
    })
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        serverSideRender: true,
        writeToDisk: true
    }))
    app.use(webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
    }))
}

app.get('*', async (req, res, next) => {
    await render(req.url, res)
})

app.listen(3001, () => {
    console.log('Listening on http://localhost:3001')
})
