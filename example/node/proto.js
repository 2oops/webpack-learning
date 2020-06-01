function Cat(name, color) {
  let heart = 'xin'
  let heartBeat = function() {
    console.log('心跳')
  }
  this.name = name
  this.color = color
  this.jump = () => {
    heartBeat()
  }
}

Cat.description = "这是静态属性" // 类似的有Promise.all()
Cat.prototype.cleanTheBody = () => {
  console.log('猫的公有属性')
}

let cat = new Cat('2oops', 'white')
cat.jump()
console.log(cat)
cat.cleanTheBody()
console.log(cat.description) // 静态属性不在原型链上访问不到

// 构造函数自身属性和定义在构造函数原型对象中的属性的区别
// 两者都是实例对象的公有属性，构造函数自身的属性会直接表现在实例对象上
// 而原型链上的属性不会，却可以访问

// 可枚举属性下的遍历操作
for(key in cat) {
  if(cat.hasOwnProperty(key)) {
    console.log(`自身属性${key}`)
  } else {
    console.log(`非自身属性${key}`)
  }
}
console.log(Object.keys(cat))
console.log(Object.getOwnPropertyNames(cat))

function Dog(color) {
  this.color = color
  this.getColor = () =>  {
    return this.color
  }
}
Dog.prototype.getColor = 'white'
Object.prototype.color = 'red'
Object.prototype.feature = 'big'
let wangwang = new Dog('black')
console.log(wangwang.getColor()) // black
console.log(wangwang.color) // black
console.log(wangwang.feature) // big


class CCat {
  constructor(name, color) {
    let heart = 'xin'
    let heartBeat = function() {
      console.log(`${heart} + 跳`)
    }
    this.name = name
    this.color = color
    this.jump = function() {
      heartBeat()
    }
  }
  color = 'red';
  cleanTheBody = function() {
    console.log('洗澡')
  };
  feature = 'cute';
  handle() { // 只能实例访问
    console.log('handle')
  }
}

let ccat = new CCat('xiaoxiao', 'white')
console.log(ccat)
ccat.jump()
console.log(Object.keys(ccat))
console.log(ccat.color) // white
console.log(CCat.color) // red
console.log(ccat.feature)
console.log(Object.getOwnPropertyNames(ccat))
ccat.handle()

class Person {
  constructor(name, age) {
    this.name = name
    this.age = 20
  }
  age = 21
  getAge = function() {
    console.log(this.age) // 存在相同属性取构造函数内的
    console.log(age)
  }
  getArrowAge = () => {
    console.log(age)
  }
  static sex = "male" // 静态属性
}
age = 23
let person = new Person('2oops', 22)
person.getAge()
person.getArrowAge()
console.log(Person.sex)

class P {
  type = 'class'
  getType = function () {
    console.log(this.type)
    console.log(type)
  }
  getName() {
    console.log('定义到原型对象上')
  }
}
type = 'window'
let p = new P()
p.getType()
console.log(p)
p.getName()
console.log(Object.keys(p))
for(k in p) {
  console.log(k)
}
console.log(Object.keys(P.prototype))