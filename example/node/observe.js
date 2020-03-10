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
