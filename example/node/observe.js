// vue2 响应式原理 分为:
// 对象响应式 核心思想：递归遍历传入的obj， 对每个属性拦截、更新
// 数组响应式 核心思想：Object.defineProperty不支持数组
// 可以修改数组的7个方法：push pop shift unshift splice reverse sort
// 从数组原型中获取这7个方法，并覆盖为可以发送更新通知的函数实现

const originalProto = Array.prototype

// 克隆originalProto
const arrayProto = Object.create(originalProto)

let methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort']

methods.forEach(method => {
  arrayProto[method] = function() {
    // 数组本身方法的实现不改变
    originalProto[method].apply(this, arguments)

    // 通知更新
    notifyUpdate()
  } 
})

function observe(obj) {

  if(typeof obj !== 'object' || obj === null) {
    return
  }

  // 判断数组
  if(Array.isArray(obj)) {
    Object.setPrototypeOf(obj, arrayProto)
  }

  const keys = Object.keys(obj)

  for(let index = 0; index < keys.length; index++) {
    const key = keys[index]
    // 对obj的每个key执行拦截
    defineReactive(obj, key, obj[key])
  }
}

// key值拦截器
function defineReactive(obj, key, val) {
  // 递归嵌套的对象
  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newVal) {
      if(newVal !== val) {
        // val为对象时递归
        observe(newVal)

        notifyUpdate(newVal)
        val = newVal
      }
    }
  })
}

// 通知更新
function notifyUpdate(val) {
  console.log("Data updated")
}

const data = {
  foo: 'foo',
  bar: {a : 1},
  arr: [1,2,3]
}

observe(data)
// 1.普通更新
// data.foo = "2oops"
// // 2.嵌套属性更新
// data.bar.a = 10
// // 3.赋值对象
// data.bar = {a: 20}
// 4.数组更新
data.arr.push(4)

// 问题分析
// 1.响应的数据较大时，递归遍历性能存在问题
// 2.新增或删除属性无法监听
// 3. 数据响应式需额外实现，需要为每个属性设置setter,getter



//**********/
// vue3原理:使用Proxy对对象进行拦截
function isObject(obj) {
  return typeof obj === "object" || obj === null
}

// 缓存
const toProxy = new WeakMap() // 形如 obj: observed
const toRaw = new WeakMap() // 形如: observed: obj

const activeReactiveEffectStack = []
function effect(fn) {
  // 1.异常处理
  // 2.执行函数
  // 3. 放到数组里面
  const rxEffect = function(...arguments) {
    try {
      activeReactiveEffectStack.push(rxEffect)
      return fn(...arguments) // 默认执行函数触发依赖收集
    } finally {
      activeReactiveEffectStack.pop()
    }
  }
  rxEffect() // 默认立即执行
  return rxEffect
}

// {target:{key: []}}
// WeakMap Map Set
let targetsMap = new WeakMap() // 使用WeakMap()避免内存泄漏
function track(target, key) {
  const effect = activeReactiveEffectStack[activeReactiveEffectStack.length - 1]
  if(effect) {
    let depsMap = targetsMap.get(target)
    if(!depsMap) {
      // 首次访问target
      depsMap = new Map()
      targetsMap.set(target, depsMap)
    }

    // 存放key
    let deps = depsMap.get(key)
    if(!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    if(!deps.has(effect)) {
      deps.add(effect)
    }
  }
}

function reactive(obj) {
  if(!isObject(obj)) {
    return obj
  }

  // 查找缓存
  if(toProxy.has(obj)) {
    return toProxy.get(obj)
  }
  // 传入obj就是代理对象，不用重复代理
  if(toRaw.has(obj)) {
    return obj
  }

  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      // 访问
      const res = Reflect.get(target, key, receiver)
      console.log(`get ${key}:${res}`);
      // 依赖收集
      track(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      // 新增和修改
      const res = Reflect.set(target, key, value, receiver)
      console.log(`set ${key}:${res}`);
      
      // return res
      return isObject(res) ? reactive(res) : res
    },
    deleteProperty(target, key) {
      // 替代$delete 删除
      const res = Reflect.deleteProperty(target, key)
      console.log(`delete ${key}: res ${res}`);
      
      return res
    }
  })

  // 缓存
  toProxy.set(obj, observed)
  toRaw.set(observed, obj)

  return observed
}

let obj = { 
  foo: '2oops',
  age: 20,
  bar: {
    a: 1
  }
}
const react = reactive(obj)
// react.foo = "hello" // set修改
// react.name = "biubiu" // set新增
// react.age  // get
// delete react.foo // delete foo: res true
// // 嵌套对象
// react.bar.a = 2 // get bar: [object object] / set a:true

// 避免重复代理
// console.log(reactive(obj) === react);

// 依赖收集
// 1. 设置中间对象数组保存当前响应函数
// 2. 如何保存key和fn之间的关系
// {target: {key: [effect1, effect2, ... ]}}

effect(() => {
  console.log("effect change", react.foo) // 2oops
})
react.foo = "uuu" // set foo:true