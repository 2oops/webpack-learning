**Array.from() & Array.of()**

1. Array.from()的用法

   **只要是部署了iterator接口的数据结构，Array.from都能将其转为数组**

   ```javascript
   let arr = Array.from('abcd')
   console.log(arr) // ["a", "b", "c", "d"]
   ```

   **传入第二个参数， 类似map**

   `let arr = Array.from([1, 2, 3], (x) => x * x)// [1, 4, 9]`

   `Array.from({ length: 2 }, () => 'jack')// ['jack', 'jack']`

2. Array.of()将一系列值转换成数组

   ```javascript
   let items = Array.of(1,2)
   // length 2
   items[0] // 1
   items[1] //2
   ```

   基本上可以替代Array和new Array

   

