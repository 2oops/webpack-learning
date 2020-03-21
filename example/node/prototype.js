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
// Person.prototype是在new Person()的时候创建的，然后（直白武断来说）关联到Person.prototype上
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
console.log("***");

console.log(person) // Person { name: '2oops', age: 20, getName: [Function] }
person.getName() // "2oops"
console.log(person.a) // "2"
console.log(person.hasOwnProperty('a')) // false
console.log(person.hasOwnProperty('name')) // true
console.log('a' in person) // true


// You don't know JS
// 1. prototype

let obj = {
  name: '2oops',
  price: 200
}
let objProto = Object.create(obj)
objProto.age = 20

for(let k in objProto ) {
  console.log(objProto[k])  // 20 name
}
console.log(obj.hasOwnProperty("name")) // true
console.log(objProto.hasOwnProperty("name")) // false
objProto.price++ // 隐式屏蔽
console.log(objProto.price) // 201
console.log(obj.price) // 200
// 唯一让原型内方法的price增加的方法是obj.price++，即直接操作原型方法
obj.price += 100
console.log(obj.price) // 300


// 2. class
// JS中只有对象，面向对象语言，不通过类即可创建对象
// 函数原型的构造函数等于其本身