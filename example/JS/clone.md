**深拷贝与浅拷贝**

1. 区分基本数据类型和引用数据类型

   引用数据类型：该对象在栈中引用，在堆内存中存储

2. 深拷贝与浅拷贝

   针对Object和Array这样的引用数据类型的

   浅拷贝只复制指向对象的指针，而不复制对象本身，两个对象共享一个内存

   深拷贝则是创建另一个一摸一样的对象，不共享内存，修改新对象不会修改到原对象

   当我们把一个对象赋值给另一个对象时，赋的是该对象在栈中的地址，而不是存储在堆中的数据

   ```javascript
   // 浅拷贝
   let person = {
     name: '2oops',
     age: 20,
     language: ['en', 'zh']
   }
   function clone(obj) {
     let result = {}
     for(let key in obj) {
       result[key] = obj[key]
     }
     return result
   }
   clone(person)
   console.log(clone(person))
   ```

3. 浅拷贝的实现方式

   - Object.assign()

     ```javascript
     let obj = { a: {a: "kobe", b: 39} };
     let initalObj = Object.assign({}, obj);
     initalObj.a.a = "wade";
     console.log(obj.a.a); //wade
     // 当对象只有一层时是深拷贝
     let obj = {
       username: 'kobe'
     }
     let obj2 = Object.assign({},obj);
     obj2.username = 'wade';
     console.log(obj);//{username: "kobe"}
     ```

   - Array.prototype.concat()

     ```javascript
     let arr = [1, 3, {
         username: 'kobe'
         }];
     let arr2=arr.concat();    
     arr2[2].username = 'wade';
     console.log(arr); // wade
     ```

   - Array.prototype.slice()

     ```javascript
     let arr = [1, 3, {
       username: ' kobe'
     }];
     let arr3 = arr.slice();
     arr3[2].username = 'wade'
     console.log(arr); // wade
     ```

   slice 和 concat都不改变原数组，只是返回了一个浅复制了原数组的新数组

4. 深拷贝的实现方式

   - JSON.parse(JSON.stringify())

     注意此种方法不能处理函数

     ```javascript
     let arr = [1, 3, {
         username: ' kobe'
     }];
     let arr4 = JSON.parse(JSON.stringify(arr));
     arr4[2].username = 'duncan'; 
     console.log(arr, arr4)
     ```

   - 手写递归

     遍历对象/数组，直到里边都是基本数据类型，然后再复制，即实现了深拷贝

     ```javascript
     //定义检测数据类型的功能函数
     function checkedType(target) {
       return Object.prototype.toString.call(target).slice(8, -1)
     }
     //实现深度克隆---对象/数组
     function clone(target) {
       //判断拷贝的数据类型
       //初始化变量result 成为最终克隆的数据
       let result,
         targetType = checkedType(target)
       if (targetType === 'Object') {
         result = {}
       } else if (targetType === 'Array') {
         result = []
       } else {
         return target
       }
       //遍历目标数据
       for (let i in target) {
         //获取遍历数据结构的每一项值。
         let value = target[i]
         //判断目标结构里的每一值是否存在对象/数组
         if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
           //对象/数组里嵌套了对象/数组
           //继续遍历获取到value值
           result[i] = clone(value)
         } else {
           //获取到value值是基本的数据类型或者是函数。
           result[i] = value
         }
       }
       return result
     }
     ```

     

   - lodash库

     ```javascript
     let _ = require('lodash');
     let obj1 = {
         a: 1,
         b: { f: { g: 1 } },
         c: [1, 2, 3]
     };
     let obj2 = _.cloneDeep(obj1);
     console.log(obj1.b.f === obj2.b.f);
     ```

     