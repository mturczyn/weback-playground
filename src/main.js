console.log('MAIN.JS: Hello, world!')

document
    .getElementById('sayHiButton')
    .addEventListener('click', (e) => sayHi('Michal'))

function sayHi(name) {
    alert(`Hello ${name}`)
}
