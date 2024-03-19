import { multiply } from './stronglyTypedUtilities'
import { sayHi } from './utilities'

console.log('MAIN.JS: Hello, world!')

document
    .getElementById('sayHiButton')
    .addEventListener('click', (e) => sayHi('Michal'))

document
    .getElementById('multiplyButton')
    .addEventListener('click', (e) => alert(`2 * 3 = ${multiply(2, 3)}`))
