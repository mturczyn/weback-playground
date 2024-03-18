import './main.js'
import './main.css'
// Tested how it will procduce polyfills. Checkout the budle.
// Now, switched to babel-loader.
// import 'babel-polyfill'

console.log('INDEX.JS: Hello, world!')

let h = document.createElement('h1')
h.innerText = 'Hello, webpack world!'
document.body.appendChild(h)
