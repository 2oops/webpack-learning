**原型与原型链**

1. 构造函数

   构造函数的目的就是为了创建一个自定义类，并且创建这个类的实例。

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
   obj.isPrototypeOf(objProto) // true
   ```