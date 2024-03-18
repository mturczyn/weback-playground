import { sayHi } from './utilities'

console.log('MAIN.JS: Hello, world!')

document
    .getElementById('sayHiButton')
    .addEventListener('click', (e) => sayHi('Michal'))
