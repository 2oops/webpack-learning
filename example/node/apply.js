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

function foo3() {
  console.log('foo3')
}
let myfoo = foo3
let obj4 = {
  foo3: foo3
}
obj4.foo3()
foo3()
myfoo()

let arr2 = [1,2,3]
let obj5 = {
  myarr: arr2 // 引用了数组，数组数据更改两者引用会跟着改变，反之亦然
}
console.log(obj5.myarr)
arr2[4] = '5'
arr2.baz = 'baz' // 添加属性，不会改变数组长度
console.log(arr2)
console.log(arr2.length) // 5
console.log(obj5.myarr)
obj5.myarr.push(666)
console.log(arr2.length) // 6

let obj6 = {
  foo: undefined
}
console.error(obj6.foo)
console.log(obj6.b)

function Foo() {
  console.log("Foo")
}
Foo.prototype.getName = function() {
  console.log("foo.prototype")
}
let fooooo = new Foo()
if(fooooo instanceof Foo) {
  fooooo.getName()
} else {
  console.log('fooooo is not instanceof Foo')
}