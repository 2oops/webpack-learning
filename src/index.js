function component() {
  const element = document.createElement('h2')

  element.innerHTML = _.join(['hello', '2oops'], ' ')

  return element
}
document.body.appendChild(component())
