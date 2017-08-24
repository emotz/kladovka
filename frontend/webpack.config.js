/* eslint-env node*/
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    watchOptions: {
        aggregateTimeout: 100,
    },
    module: {
        loaders: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
            { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url-loader' },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
            }
        ]
    },
    resolve: {
        alias: {
            'bootstrap.css$': 'bootstrap/dist/css/bootstrap.min.css',
            'toastr.css$': 'toastr/build/toastr.min.css',
            'nprogress.css$': 'nprogress/nprogress.css',
            'api.json$': path.join(__dirname, '../config/api.json'),
            'domain': path.join(__dirname, '../domain/src/')
        },
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/index.html' },
            { from: './src/style.css' },
            { from: './assets' }
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            toastr: 'toastr',
            'window.NProgress': 'nprogress'
        }),
    ]
};