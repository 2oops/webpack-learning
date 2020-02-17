// 构造函数

function Person(name, age) {
  this.name = name
  this.age = age
  this.getName = function() {
    console.log(this.name)
  }
  Person.prototype.a = '2'
  Person.prototype.getAge = function() {
    console.log(this.age)
  }
}

let person = new Person('2oops', 20)
console.log(person) // Person { name: '2oops', age: 20, getName: [Function] }
person.getName() // "2oops"
console.log(person.a) // "2"
console.log(person.hasOwnProperty('a')) // false
console.log(person.hasOwnProperty('name')) // true
console.log('a' in person) // true

