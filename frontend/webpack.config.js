const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100,
    },
    module: {
        loaders: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
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
            'bootstrap.js$': 'bootstrap/dist/js/bootstrap.min.js',
        },
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/index.html' },
            { from: './src/style.css' },
            { from: './assets' }
        ])
    ]
};