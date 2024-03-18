const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        environment: {
            arrowFunction: false,
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
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
}
