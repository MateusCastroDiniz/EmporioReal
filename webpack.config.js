const path = require('path')
const HtmlWP = require('html-webpack-plugin')
const Minicss = require('mini-css-extract-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.(sa|c|sc)ss$/i,
                use: [
                    Minicss.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }

        ]
    },
    plugins:[
        new HtmlWP({
            filename:'index.html',
            template: './src/index.html'
        }),
        new Minicss({
            filename:'styles.css'
        })
    ]
}