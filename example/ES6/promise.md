**Promise**

1. 原理：promise是一种对异步的封装，通过独立的接口添加到在异步操作执行成功或失败时的方法，主流规范Promise/A+

   三个状态：pendding、fulfilled、rejected

   ```javascript
   function loadImg(src) {
     let promise = new Promise((resolve, reject) => {
   		let img = document.createElement('img')
       img.onload = function() {
         resolve(img)
       }
       img.onerror = function() {
         reject('fail')
       }
     })
     return promise
   }
   let src = 'http://ddd'
   let res = loadImg(src)
   res.then(img => {
     console.log(img)
   }).then(img => {
     
   })
   ```

2. **promise多个串联操作**

   比如现在有个需求，实现第一张图片加载完成后加载第二张，如果其中一个执行失败，就执行错误函数

   ```javascript
   let src1 = 'http://1'
   let src2 = 'http://2'
   let res1 = loadImg(src1)
   let res2 = loadImg(src2)
   res1.then((img1) => {
     console.log('img1 success')
     return res2
   }).then((img2) => {
     console.log(img2)
   }).catch(err => {
     console.log(err)
   })
   ```

3. **promise常用方法**

   **promise.all**

   ```javascript
   let p1 = new Promise((resolve, reject) => {
     setTimeout(resolve, 500, 'p1')
   })
   let p2 = new Promise((resolve, reject) => {
     setTimeout(resolve, 1000, 'p2')
   })
   Promise.all([p1, p2]).then(res => {
     console.log(res) // ["p1", "p2"]
   })
   Promise.race([p1, p2]).then(res => {
     console.log(res) // p1
   })
   ```

4. **Async/Await**

   基于Promise实现，但是不能用于普通的回调函数，非阻塞

   await后面跟的是一个Promise实例，需要引入babel-polypill 即`npm i --save-dev babel-polyfill`

   ```javascript
   let src1 = 'http://1'
   let src2 = 'http://2'
   let load = async function() {
     const res1 = loadImg(src1)
     console.log(res1)
     const res2 = loadImg(src2)
     console.log(res2)
   }
   load()
   ```

   Async/await错误处理

   ```javascript
   async function foo() {
   	try {
       await somethingThatReturnsPromise
     } catch(err) {
       console.log(err)
     }
   }
   ```

   链式调用

   因为其每次返回的都是一个新的Promise实例，这就是then可链式调用的原因

   如果then中返回的是一个结果的话会把这个结果传递到下一次then中的成功回调

   ```javascript
   Promise.resolve(1).then(res => {
     console.log(res) // 1
     return 2 // 包装成 Promise.resolve(2)
   }).catch( err => 3)
   .then(res => {
     console.log(res) // 2
})
   ```

   如果then中出现异常，会走下一个then的失败回调
   
   
   
   为什么async/await更好？
   
   1. 简洁，少then，避免嵌套
   
   2. 中间值
   
      ```javascript
   const makeRequest = async() => {
        let value1 = await promise1()
        let value2 = await promise2(value1)
        return promise3(value1, value2)
      }
      ```
   
   3. 条件语句
   
      ```javascript
      const makeRequest = async() => {
      	let data = await getJSON()
        if(data.needAnotherRequest) {
          let moData = await getMoreData(data)
          return moData
        }else {
          return data
        }
      }
      ```
   
      

