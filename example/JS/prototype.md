**原型与原型链**

1. 构造函数

   构造函数的目的就是为了创建一个自定义类，并且创建这个类的实例。

   **函数原型的构造函数等于其本身**

   ```javascript
   function Foo() {}
   Foo.prototype.constructor === Foo; // true
   let a = new Foo() // 构造函数调用
   a.constructor === Foo // true
   a.getName = function() {console.log("aa")}
   // 绝大多数浏览器提供了__proto__（非标准的方法）来访问内部prototype属性
   a.__proto__ === Foo.prototype // true
   ```

2. 原型

   每当定义一个函数数据类型的时候（函数或类）都会天生自带一个`prototype`属性，这个属性指向函数的原型对象，并且这个属性是一个对象数据类型的值。

3. 原型链

   **__proto__`和`constructor**

   每一个对象数据类型（函数、对象、实例等）都自带一个`__proto__`，属性值是当前实例的原型，原型对象中有一个`constructor`，指向函数对象。

   **何为原型链**

   JS中万物都是对象，对象之间是有联系的；在JS中通过`prototype`指向父类对象，知道指向Object对象为止，这就形成了一个链条称之为原型链。

   如果在Object原型中都没有找到，则返回undefined

   可以使用对象的`hasOwnProperty()`来检查对象自身中是否含有该属性；使用`in`检查对象中是否含有某个属性时，如果对象中没有但是原型中有，也会返回true。

   ```javascript
   let obj = {
      name: "2oops"
   }
   let objProto = Object.create(obj)
   objProto.age = 20
   for(let key in objProto) {
      console.log(key); // age name 
   }
   obj.isPrototypeOf(objProto) // true ES6
   Object.getPrototypeOf(objProto) // obj ES5
   Object.getPrototypeOf(objProto) === objProto.prototype // objProto.prototype为undefined
   // objProto.prototype是undefined，但是实际是关联上了，使用getPrototypeOf访问
   Object.getPrototypeOf(objProto) === objProto.__proto__ // true
   // 绝大多数浏览器提供了__proto__（非标准的方法）来访问内部prototype属性
   objProto.__proto__ == objProto.prototype // 
   ```
   
   所有的普通对象都有内置的Object.prototype，指向原型链的顶端（或者说全局作用域），找不到就停止，toString(), valueOf()等都存在于Object.prototype对象上，因此，所有的对象都可以使用它们。
   
   **JS机制有一个核心的区别，那就是不会进行复制，对象之间是通过内部的prototype链关联的，因为与其用原型继承等表述这种操作，不如说是使用委托更合适，对象间的关系不是复制而是委托。**
   
4. 使用内部委托使API接口更加清晰

   ```javascript
   // 假设有个对象
   let Person = {
   	getName: function() {
       console.log("2oops")
     }
   }
   let developer = Object.create(Person)
   developer.getName() // 直接委托
   // 内部委托
   developer.myGetName = function() {
     this.getName() // 注意这里换了函数名，如果用原来的函数名的话相当于重写，
   }
   // 以下会报栈溢出错误
   // developer.getName() = funciton() {
   //	this.getName()
   //}
   developer.myGetName()
   ```

   