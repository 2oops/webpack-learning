import './assets/layout.less'

function component() {
  const element = document.createElement('h2')

  element.innerHTML = 'css-layout'

  return element
}
document.body.appendChild(component())

console.log('layout.js')
