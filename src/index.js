import './assets/index.css'
import _ from 'loadsh'

function component() {
  const element = document.createElement('h2')

  element.innerHTML = _.join(['loadsh', 'join'], '-')

  return element
}
document.body.appendChild(component())

console.log('index.js')
