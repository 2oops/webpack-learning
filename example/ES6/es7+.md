**ES7、ES8、ES9、ES10新特性**

**ES7**

1. **Array.prototype.includes()**

   不区分正负0

2. 求幂运算符

**ES8**

1. async/await  await 后面一定是Promise 对象，如果不是会自动包装成Promise对象。

   ```javascript
   async function foo() {
   	try {
       let res1 = await fetch('https://')
       console.log(res1)
       let res2 = await fetch('https://')
       console.log(res2)
     } catch (err) {
       console.log(err)
     }
   }
   ```

   async是一个异步执行并隐式返回Promise作为结果的函数

   ```javascript
   async function foo() {
     return '2oops'
     // 等同于 return Promise.resolve('2oops')
   }
   foo().then( val => {
     console.log(val)
   })
   ```

2. **Object.values()，Object.entries()**

   ```javascript
   const obj = { foo: 'bar', baz: 42 };
   Object.values(obj) // ["bar", 42]
   const obj = { 100: 'a', 2: 'b', 7: 'c' };
   Object.values(obj) // ["b", "c", "a"] 按键名从小到大排列
   
   // Object.entries()返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组
   const obj = { foo: 'bar', baz: 42 };
   Object.entries(obj) // [ ["foo", "bar"], ["baz", 42] ]
   const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
   Object.entries(obj); // [['1', 'yyy'], ['3', 'zzz'], ['10': 'xxx']]
   ```

3. String padding

   ```javascript
   '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
   '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
   ```

4. Object.getOwnPropertyDescriptors()

**ES9**

1. **for await of**

2. **Object Rest Spread**

3. **Promise.prototype.finally()**

   ```javascript
   fetch('http://').then(res => {
     
   }).catch(err => {
     
   }).finally(() => { })
   ```

**ES10**

1. **Array.prototype.flat**

   按指定深度递归遍历数组，默认深度为1

   ```javascript
   const numbers2 = [1, 2, [3, 4, [5, 6]]]
   console.log(numbers2.flat(2))// [1, 2, 3, 4, 5, 6]
   ```

2. **Array.prototype.flatMap**

   结合map后实际上只能打平一层

   ```javascript
   let arr = [1, 2, 3]
   console.log(arr.map(item => [item * 2]).flat()) // [2, 4, 6]
   console.log(arr.flatMap(item => [item * 2])) // [2, 4, 6]
   ```

3. **Object.fromEntries()**
4. **String.trimStart & String.trimEnd**
5. **String.prototype.matchAll**
6. **try…catch**
7. **BigInt**
8. **Function.prototype.toString()**

