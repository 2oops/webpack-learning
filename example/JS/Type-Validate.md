**JS数据类型及其检测**

1. **===**只能用于检测`null  undefined`

2. `typeof`不能检测数组和对象

3. `instanceof`不能检测`null  undefined`，且不能检测字面量创建基本类型，在类的原型继承中，检测未必准确。

   `instanceof`用来测试一个对象在其原型链属性中是否存在一个`prototype`属性。

   `Array.isArray([]) // true`

   ```javascript
   // 字面量创建的基本类型
   console.log(1 instanceof Number)//false
   console.log(new Number(1) instanceof Number)//true
   ```

   ```javascript
   // 类的原型继承中，只要在当前实例的原型链上，结果都为true
   let arr = [1, 2, 3];
   console.log(arr instanceof Array) // true
   console.log(arr instanceof Object);  // true
   function fn(){}
   console.log(fn instanceof Function)// true
   console.log(fn instanceof Object)// true
   ```

4. `constructor`不能检测`null undefined`，且如果把类的原型重写，也检测不准确。

   类似`instanceof`，而且它还能检测基本类型（null undefined除外）

   ```javascript
   let aa = [1,2];
   console.log(aa.constructor===Array);//true
   console.log(aa.constructor===RegExp);//false
   console.log((1).constructor===Number);//true
   let reg=/^$/;
   console.log(reg.constructor===RegExp);//true
   console.log(reg.constructor===Object);//false 
   ```

   由于`null undefined`是无效的对象，因此constructor压根而儿不存在

   ```javascript
   // 原型重写使得校验不准确
   function Fn(){}
   Fn.prototype = new Array()
   let f = new Fn
   console.log(f.constructor)//Array
   ```

5. **最准确的常用方式：Object.prototype.toString.call()**

   首先获取Object原型上的toString方法，然后执行，让toString方法中的this指向第一个参数的值

   toString方法的作用是返回当前方法执行主体（this）的所属类的详细信息如[object Object]

   ```javascript
   Object.prototype.toString.call('') ;   // [object String]
   Object.prototype.toString.call(1) ;    // [object Number]
   Object.prototype.toString.call(true) ; // [object Boolean]
   Object.prototype.toString.call(undefined) ; // [object Undefined]
   Object.prototype.toString.call(null) ; // [object Null]
   Object.prototype.toString.call(new Function()) ; // [object Function]
   Object.prototype.toString.call(new Date()) ; // [object Date]
   Object.prototype.toString.call([]) ; // [object Array]
   Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
   Object.prototype.toString.call(new Error()) ; // [object Error]
   Object.prototype.toString.call(document) ; // [object HTMLDocument]
   Object.prototype.toString.call(window) ; //[object global] window是全局对象global的引用
   ```

***

基本类型和引用类型：[参考](https://www.cnblogs.com/c2016c/articles/9328725.html)

传值和传址，栈内存和堆内存

基本类型的特点：

- 值不可改变，这里不可变是说操作后值不变，不是说重新赋值。

- 存放在栈内存

- 值的比价

  == 进行值的比较还会进行类型转换

  === 不仅进行值的比较还须要数据类型的比较

引用类型的特点：

- 值可变

- 存放在栈内存和堆内存

- 比较是引用的比较

  ```javascript
  let a = { age: 20 }
  let b = a 
  a = {}
  b // {age: 20}
  ```

  

两种类型的区别：

- 引用类型是存放在堆内存中的对象，变量是保存在栈内存中的一个指针（堆内存中的引用地址），指针指向堆内存。

- 基本类型按值访问，引用类型按引用（指针）访问。

***



