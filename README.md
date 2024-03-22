# weback-playground

Repository to try out webpack.

Followed resources on [webpack docs](https://webpack.js.org/concepts).

To start this repo's project I have used simple tutorial on [Webpack for Static Sites](https://medium.com/riow/webpack-for-static-sites-9cbfd8363abb). Here's the essence

1. Create project directory and navigate to it:

    ```
    New-Item -Type Directory project
    cd ./project
    ```

2. Initialize npm

    ```
    npm init
    ```

3. Install webpack

    ```
    npm install --save-dev webpack
    ```

4. Install `css-loader` and `style-loader` libraries (to compile CSS):

    ```
    npm install --save-dev css-loader style-loader
    ```

    `css-loader` transforms CSS to a JS module.  
    `style-loader` injects the CSS, exported as JS module, into JS as `<style>` element.

5. Install webpack

    ```
    npm install --save-dev webpack
    ```

6. Create `dist` directory that will hold ouput of webpack - bundled JS file:

    ```
    New-Item -Type Directory dist
    ```

7. Define script in `package.json` to build (compile) our code:

    ```
    "build": "webpack --mode production"
    ```

8. Create `app.js` (our entry point for compilation) in `public` directory.

    ```
    New-Item -Type Directory public
    cd ./public
    "" >> app.js
    ```

9. Create `main.js` file in `public/js` directory and include as dependency in `app.js`:

    ```
    "require('./js/main.js');" >> app.js
    ```

10. Create the `main.css` file in `public/css` directory and include as dependency in `public/js/main.js` file:

    ```
    require('../css/main.css');
    ```

    By now, files structure should be:

    ```
    /
        dist/
        public/
            app.js
            js/
                main.js
            css/
                main.css
    ```

11. Create webpack configuration file in root directory. Filename should be `webpack.config.js` and its content should be:
    ```
    module.exports = {
        entry: './public/app.js',
        output: {
            path: __dirname + '/dist',
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            }]
        }
    }
    ```
12. Now, run build script:
    ```
    npm run build
    ```
    This will minify JS and CSS to `bundle.js`.

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

## Bundling CSS

Firstly, I have used `css-loader` and `style-laoder`. The `style-ladoer` library was used to inject ouptput of `css-loader` into JS (as `style` element).

**`webpack.config.js`**:

```
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
},
```

There is also another way, we can switch `style-loader` to `mini-css-extract-plugin` to have separate CSS files as output.

**`webpack.config.js`**

```
{
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
},
```

Also plugins need to be updated:

```
plugins: [
    ...
    new MiniCssExtractPlugin(),
],
```

## Multi page applicaitons

[Multi-Page Application Webpack docs.](https://webpack.js.org/concepts/entry-points/#multi-page-application)

We can speicify multiple entry points, such as

```
module.exports = {
  entry: {
    index: './src/index.js',
    otherPage: './src/otherPage.js'
  },
};
```

In order to complete configuration, to prevent multiple outputs writing to the same file (which results in webpack's error), we need also to define:

```
output: {
    ...
    filename: 'bundle[name].js',
    ...
},
```

Later, we can also specify which HTML files will be bundled with what JS bundles by specifying `chunks` matching `entry` entries:

```
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
```

## Code splitting

In order to have more performant initial load, we may reduce general bundle and split it into chunks that will load later. Best example is use of React's `lazy` function:

```
const MyComponent = lazy(() => import('MyComponent'))
```

It makes that code for the component is loaded in the client's browser once needed, not in initial bundle. It has its reflection in how bundles are created - when using code splitting (with React's `lazy` for example), bundles are split into multiple files that are lazily loaded. Left picture presents code-splitted build, picture on the right does not use this optimization:
![code splitting in react - bundle](code-splitting-in-react.png)
