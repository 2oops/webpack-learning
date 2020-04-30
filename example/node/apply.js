function foo(arg) {
  console.log(this.a, arg)
  return arg
}

let obj = {
  a: 2
}

let bar = function() {
  return foo.apply(obj, arguments)
}

let b = bar([1,2]) // 2 [1,2]
console.log(b) // [1,2]

let baz = () => {
  foo.call(obj)
}
baz() // 2 undefined

// 简单的bind函数
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments)
  }
}

let bar1 = bind(foo, obj)
let c = bar1(4)
console.log(c) // 4

let bar2 = foo.bind(obj)
let d = bar2(5)
console.log(d)

// forEach本身实现了显示绑定
let obj3 = []
function fooo(el) {
  console.log(el, this.a)
}
let obj2 = {
  a: 'context'
}
let arr = [1,2,'22']

arr.forEach(fooo, obj2)

// new绑定中的bind，之所以在new中使用硬绑定，是为了预先设置函数的一些参数，然后在使用
// new初始化时就可以只传入其余的参数，
// bind的功能之一就是把除了第一个参数用于绑定this之外的其他参数传递给下层函数（柯里化的一种）
function foo2(a, b) {
  this.val = a + b
}
let bind1 = foo2.bind(null, 1) // 这里是传递的a
let new1 = new bind1(2) // 这里是传递的b
console.log(new1.val) // 3