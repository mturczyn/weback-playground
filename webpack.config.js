const path = require('path')
const { webpackRules } = require('./webpackRules')
const { generateWebpackPlugins } = require('./webpackPlugins')

const index = 'index'
const otherPage = 'otherPage'

const entries = { [index]: './src/index.js', [otherPage]: './src/otherPage.js' }

module.exports = {
    entry: entries,
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
        rules: webpackRules,
    },
    plugins: generateWebpackPlugins(index, otherPage),
}
