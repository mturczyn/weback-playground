const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ConsoleLogOnBuildWebpackPlugin = require('./ConsoleLogOnBuildWebpackPlugin')
const webpack = require('webpack')

module.exports = {
    generateWebpackPlugins: (indexChunkName, otherPageChunkName) => [
        new ConsoleLogOnBuildWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: [indexChunkName],
        }),
        new HtmlWebpackPlugin({
            filename: 'otherPage.html',
            template: 'src/otherPage.html',
            chunks: [otherPageChunkName],
        }),
        new MiniCssExtractPlugin(),
    ],
}
