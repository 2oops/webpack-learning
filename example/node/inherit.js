
// class继承
class Person {
  constructor(name, age, weight) {
    this.name = name
    this.age = age
    this.weight = '120'
  }
  getName() {
    console.log('调用父类的方法')
    console.log(this.name, this.age)
  }
}

let person = new Person('2oops', 20, 130)
console.log(person) // Person {name: '2oops, age: 20, weight: '120'}

class Manager extends Person {
  constructor(name, age, weight, salary) {
    super(name, age, weight)
    this.salary = salary
  }
  getSalary() {
    console.log('调用子类方法')
    console.log(this.name, this.weight, this.salary)
  }
}

let m1 = new Manager('2oops', 20, 125, 200000)
m1.getSalary()  // 2oops 120 200000


// 借用构造函数继承
// 在子类构造函数中通过call()调用父类构造函数
function Car(name, age) {
  this.name = name
  this.age = age
  this.getName = function() {}
}
Car.prototype.setAge = function() {}
function Taxi(name, age, price) {
  Car.call(this, name, age)
  this.price = price
}
let taxi = new Taxi('tesla', 10, 1000)
