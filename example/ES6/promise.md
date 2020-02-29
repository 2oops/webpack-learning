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