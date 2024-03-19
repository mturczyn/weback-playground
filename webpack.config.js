const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ConsoleLogOnBuildWebpackPlugin = require('./ConsoleLogOnBuildWebpackPlugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: { index: './src/index.js', otherPage: './src/otherPage.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle[name].js',
        environment: {
            // arrowFunction: false,
        },
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // Different ways to specify loaders
                    // { loader: MiniCssExtractPlugin.loader },
                    // { loader: 'css-loader' },
                ],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                // [ '@babel/preset-env', { targets: { chrome: 40 } }, ],
                                ['@babel/preset-env', { targets: 'defaults' }],
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ConsoleLogOnBuildWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'otherPage.html',
            template: 'src/otherPage.html',
            chunks: ['otherPage'],
        }),
        new MiniCssExtractPlugin(),
    ],
}
