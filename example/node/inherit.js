
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
console.log(taxi)

// 原型链继承
function Animals(name, age) {
  this.name = name
  this.age = 2
  this.getName = function() {
    console.log(this.name)
  }
}
Animals.prototype.getAge = function() {
  console.log('原型方法')
}
// 子类的原型为父类的一个实例对象
function Dog(name) {
  this.name = name
  this.getPrice = function() {
    console.log('123')
  }
}
Dog.prototype = new Animals()

let dog = new Dog('ooo')
let dog2 = new Dog('kkk')
console.log(dog) // Animals { name: 'ooo', getPrice: [Function] }
console.log(dog.getAge) // [Function]
console.log(dog.getName) // [Function]
// 子类的实例通过__proto__（相当于桥梁）可以访问到Dog.prototype，也就是Animals的实例
// 这样就可以访问到父类的私有方法，然后再通过__proto__指向父类的prototype就获得了父类
// 原型上的方法
console.log(dog.__proto__ === dog2.__proto__) // true

// 要在子类中添加新的方法或者是重写父类的方法时候，切记一定要放到替换原型的语句之后


// 组合继承
function Country(name) {
  this.name = name
  this.getName = function() {
    console.log(this.name)
  }
}
Country.prototype.getArea = function() {
  console.log('area')
}
function England(name, area) {
  Country.call(this, name)
  this.area = area
  this.setArea = () => { console.log(this.area)}
}
England.prototype = new Country()
England.prototype.constructor = England
England.prototype.getName = function() { console.log('getName')} // 失效
let en = new England('Eng', 30000)
console.log(en)
// England {
//   name: 'Eng',
//   getName: [Function],
//   area: 30000,
//   setArea: [Function]
// }
en.setArea() // 30000
en.getName()
