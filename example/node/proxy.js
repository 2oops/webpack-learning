let obj = new Proxy({}, {
  get: (target, key, receiver) => {
    console.log(`getting ${target} ${key}`)
    return Reflect.get(target, key, receiver)
  },
  set: (target, key, value, receiver) => {
    console.log(`setting ${target} ${key}`);
    return Reflect.set(target, key, value, receiver)
  }
})

obj.count = 1
obj.count ++

// ES6原生提供proxy构造函数，用来生成proxy实例
let target = {}, handler = {}
let proxy = new Proxy(target, handler)
// target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为
// 如果handler为🈳️对象，则相当于不做任何拦截，实例直接通向原对象
let proxy1 = new Proxy({}, {
  get: () => {
    return 20
  }
})

console.log(proxy1.num); //20
// Proxy实例也可以作为其他对象的原型
let instance1 = Object.create(proxy1)
console.log(instance1.age); //20

// 同一个拦截器对象（handler）可以拦截多个操作
let handler1 = {
  get(target, name) {
    if(name === 'prototype') {
      return Object.prototype
    }
    return `hello ${name}`
  },

  apply(target, thisBinding, args) {
    return args
  },

  construct(target, args) {
    return { value: args[1]}
  }
}

let proxy2 = new Proxy((x, y) => {
  return x + y
}, handler1)

console.log(proxy2(1, 2, 3));  //[1,2,3] apply的返回值
// console.log(new proxy2(1, 2)); // { value: 2 }
console.log(proxy2.prototype === Object.prototype) // true
console.log(proxy2.foo); // "hello foo"




