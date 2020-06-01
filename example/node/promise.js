function add(getX, getY, callback) {
  let x , y;
  getX(function(xVal) {
    x = xVal
    if(y !== undefined) {
      callback(x + y)
    }
  });
  getY(function(yVal) {
    y = yVal
    if(x !== undefined) {
      callback(x + y)
    }
  })
}
function fetchX(val) {
  return new Promise((resolve, reject) => {
    if(val > 100) {
      resolve(val)
    } else {
      reject(0)
    }
  }).catch(err => {
    console.log(err)
  })
}
function fetchY(val) {
  return new Promise((resolve, reject) => {
    if(val > 10) {
      resolve(val)
    } else {
      reject(0)
    }
  }).catch(err => {
    console.log(err)
  })
}
// add(fetchX(10), fetchY(20), function(sum) {
//   console.log(sum)
// })

function add1(xPromise, yPromise) {
  return Promise.all([xPromise, yPromise])
  .then(function(values) {
    console.log(values)
    return values[0] + values[1]
  })
}
add1(fetchX(110), fetchY(20)).then(sum => {
  console.log(sum) // 130
})

let p3 = new Promise((resolve) => {
  resolve("A")
})
let p1 = new Promise( resolve => {
  resolve(p3)
})
let p2 = new Promise(resolve => {
  resolve("B")
})
p1.then(v => {
  console.log(v)
})
p2.then(v => {
  console.log(v)
})

let p4 = Promise.resolve(20)
let p5 = p4.then(v => {
  // return v * 2
  // 每一步都有异步能力的关键在于resolve的是一个Promise或thenable而不是一个最终值
  return new Promise((resolve, reject) => {
    // resolve(v * 5)
    setTimeout(() => {
      resolve(v * 1000)
    }, 2000) // 2秒后再输出
  })
})
.then(v => {
  console.log(v)
})
// p5.then(v => {
//   console.log(v)
// })

// 定义一个1s后完成的promise
function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
delay(2000).then(function step2() {
  console.log("step2")
  return delay(2000)
}).then(function setp3(){
  console.log('step3')
}).then(function step4(){
  console.log("step4")
}).catch(err => {
  console.log(err)
})

let pp = Promise.reject("aa")
pp.then(
  function fulfilled() {
    console.log("fulfilled")
  },
  function rejected(err) {
    console.log("rejected") // rejected
    return err
  }
).then((res) => {
  console.log(res) // aa
})
.catch(err => {
  console.log(err)
})

let pp1 = Promise.resolve(1)
let pp2 = Promise.resolve(2)
Promise.all([pp1, pp2]).then((msg) => {
  console.log(msg) // [1,2]
}).catch(err => {
  console.log(err)
})

Promise.race([pp1, pp2]).then(msg => {
  console.log(msg)
}).catch(err => {
  console.log(err)
})

function gety(y) {
  return new Promise((resolve, reject) => {
    console.log("2")
    setTimeout(() => {
      console.log("3")
      resolve(3 * y - 1)
    }, 5000)
  })
}
function foo(bar, baz) {
  let x = bar * baz
  console.log("1")
  return gety(x).then(
    function(y) {
      console.log('4')
      return [x, y]
    }
  )
}
foo(10, 20).then(msgs => {
  console.log('5')
  let x = msgs[0]
  let y = msgs[1]
  console.log(x, y)
})

// 简洁版
function foo2(bar, baz) {
  let x = bar * baz
  return [
    Promise.resolve(x),
    gety(x)
  ]
}
Promise.all(foo2(10, 20)).then(msgs => {
  let [x, y] = msgs
  console.log(x, y)
})

[1,2,3].forEach(item => {
  console.log(item)
})

function bar() {
  // a = 1
  "use strict"
  // console.log(a)
  undefined = 2
  console.log(undefined)
}