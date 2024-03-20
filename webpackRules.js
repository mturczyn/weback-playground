const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    webpackRules: [
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
}
