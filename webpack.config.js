const path = require('path')
const webpack = require('webpack')
const React = require('react')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ReactFreshBabelPlugin = require('react-refresh/babel')

const isProduction = process.env.NODE_ENV === 'production'
const isServer = process.env.APP_ENV === 'server'

module.exports = {
    target: isServer ? 'node16' : 'web',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction && !isServer ? undefined : 'inline-source-map',
    entry: isServer
        ? path.resolve('./src/server-entry.js')
        : {
            app: [
                !isProduction && 'webpack-hot-middleware/client',
                path.resolve('./src/index.js'),
            ].filter(v => v),
            sw: path.resolve('./src/sw.js'),
        },
    // externals: [/^react-refresh.*/],
    output: {
        filename: isServer ? 'server-entry.js' : '[name].js',
        path: isServer ? path.resolve('server') : path.resolve('dist'),
        clean: true,
        ...(isServer ? {
            library: {
                type: 'commonjs2',
            }
        } : {}),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/env', {
                            targets: isServer
                                ? {
                                    node: process.versions.node
                                }
                                : '> 1%, not dead',
                        }],
                        ['@babel/react', {
                            runtime: 'automatic',
                            development: !isProduction,
                        }],
                    ],
                    plugins: [
                        !isProduction && !isServer && ReactFreshBabelPlugin
                    ].filter(v => v),
                }
            }
        },]
    },
    optimization: {
        concatenateModules: false,
        mergeDuplicateChunks: true,
        flagIncludedChunks: true,
        minimize: isProduction && !isServer,
    },
    plugins: [
        !isServer && !isProduction && new webpack.HotModuleReplacementPlugin(),
        !isServer && !isProduction && new ReactRefreshWebpackPlugin({
            overlay: {
                sockIntegration: 'whm',
            },
        }),
    ].filter(v => v),
}
