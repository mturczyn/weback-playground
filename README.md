# weback-playground

Repository to try out webpack.

Followed resources on [webpack docs](https://webpack.js.org/concepts).

To start this repo's project I have used simple tutorial on [Webpack for Static Sites](https://medium.com/riow/webpack-for-static-sites-9cbfd8363abb).

## Babel

Babel can be used in building with Webpack.

In order to empploy Babel, there are couple of scenarios:

-   install `npm i babel-polyfill -D` and add `import 'babel-polyfill'` to main file (entry point), this way we will get many pollyfills (at time of writing, bundle grew from 4.5K chars to 100K chars, so 20x bigger),

-   to support older borwsers, `babel-loader` could be used, in order to do that, we need to `npm install -D babel-loader @babel/core @babel/preset-env`, and then include it correctly in `webpack.config.js`.

### Replacing arrow function for greater support

Webpack uses arrow functions when produces the bundle, but it can be prevented by setting `output.environment.arrowFunction = false` in `webpack.config.js` file. But it only instructs webpack how to create the bundle (output). It does not take care of code we wrote, so it won't transpile (change) arrow functions written by us.

In order to also prevent that, we need to set `targets` option for `babel-loader` to browser not supporting arrow functions, for example Chrome, version below 44. So we have such configuration for `babel-loader`:

```JS
{
    test: /\.(?:js|mjs|cjs)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                ['@babel/preset-env', { targets: { chrome: 40 } }],
                // ['@babel/preset-env', { targets: 'defaults' }],
            ],
        },
    },
},
```
