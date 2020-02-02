**JS类型转换**

主要有数据类型强制转换和自动转换

**一丶强制转换**

`Number() String() Boolean()`

1. **转换为String**

   - toString()

     ```javascript
     let a = {}
     a.toString()  // "[object Object]"
     // 注意undefined 和null 是没有这个方法的，所以调用该方法会报错
     let num = 10
     num.toString(2) // "1010"
     ```

   - String()

     对于Number和String实际上调用的也是toString方法，null 和 undefined则直接转换为字符串

     ```javascript
     String({a: 1}) // "[object Object]"
     String([1, 2, 3]) // "1,2,3"
     ```

2. **转换为Number**

   - Number()

     又分为参数是原始类型的值和参数是对象

     ```javascript
     // 如果全为数字，则转为数字
     // 非纯数字 NaN
     // 空串和全是空格的字符串  0
     // 布尔值 1 0
     Number(true)  // 1
     // null 0
     // undefined  NaN
     // 数值为参数，返回值永远是十进制
     Number(0x12);    //18
     Number(-0x12);   //-18
     // 参数为对象时，除非是单个数字的数组返回数字，其他均返回NaN
     ```

   - parseInt() & parseFloat()

     ```javascript
     parseInt('.01') // NaN
     parseInt('2.01') // 2
     parseFloat('.01') // 0.01
     parseFloat('2.01') // 2.01
     parseFloat('.d1') // NaN
     parseInt('4.3Years') // 4
     parseFloat("4.3years") // 4.3
     parseFloat("He40.3") // NaN
     // parseInt()第二个参数表示转换的基数
     parseInt('17', 8) // 15
     ```

     Number()函数的转换要比parseInt()严格，如

     ```javascript
     parseInt('42 cats') // 42
     Number('42 Cats') // NaN
     ```

3. **转换为Boolean**

   ```javascript
   Boolean(undefined) // false
   Boolean(null) // false
   Boolean(0) // false 包括正负0
   Boolean(NaN) // false
   Boolean('') // false
   
   Boolean({}) // true
   Boolean([]) // true
   Boolean(new Boolean(false)) // true
   ```

**二丶自动转换**

1. 自动转换为数字，字符串，布尔值

   ```javascript
   true + 1 // 2
   2 + null // 2
   undefined + 1 // NaN
   2 + NaN // NaN 任何值和NaN做运算都得NaN
   '5' - '2' // 3
   '5' * '2' // 10
   true - 1  // 0
   '1' - 1   // 0
   '5' * []    // 0
   false / '5' // 0
   'abc' - 1   // NaN
   
   '5' + 1 // '51'
   '5' + true // "5true"
   '5' + false // "5false"
   '5' + {} // "5[object Object]"
   '5' + [] // "5"
   '5' + function (){} // "5function (){}"
   '5' + undefined // "5undefined"
   '5' + null // "5null"
   
   +'abc' // NaN
   -'abc' // NaN
   +true // 1
   -false // 0
   ```

   

