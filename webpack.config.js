const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: { index: './src/index.js', otherPage: './src/otherPage.js' },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle[name].js',
        environment: {
            // arrowFunction: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            // ['@babel/preset-env', { targets: { chrome: 40 } }],
                            ['@babel/preset-env', { targets: 'defaults' }],
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
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
