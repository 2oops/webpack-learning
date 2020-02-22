**JS常见的6种继承方式**

A对象通过继承B对象，就能拥有B对象的所有属性和方法

传统上，JS的继承不通过`class`，而是通过`prototype`

1. **原型链继承**

   ```javascript
   // 本质是将子类的原型指向父类的实例
   // 做到了将父类的私有、公有方法和属性都当作子类的共有属性
   function Person (name, age) {
    this.name = name,
    this.age = age
   }
   Person.prototype.setAge = function () {
    console.log("111")
   }
   function Student (price) {
    this.price = price
    this.setScore = function () { }
   }
   // Student.prototype.sayHello = function () { }//在这里写子类的原型方法和属性是无效的，
   //因为会改变原型的指向，所以应该放到重新指定之后
   Student.prototype = new Person()
   Student.prototype.sayHello = function () { }
   var s1 = new Student(15000)
   console.log(s1)
   ```

   特点：

   - 子类能访问到父类的原型和方法，即时是新增的
   - 简单

   缺点：

   - 无法实现多继承
   - 来自原型对象的所有属性被所有实例共享
   - 创建子类时，无法向父类传参

2. **借助构造函数继承**

   ```javascript
   function Person(name, age) {
     this.name = name
     this.age = age
     this.getName = function() {
       console.log(this.age)
     }
   }
   Person.prototype.getAge = function() {
     console.log('原型方法')
   }
   function Student(name, age, price) {
     Person.call(this, name, age)
     this.price = price
     this.getPrice = function() {
       console.log(this.price)
     }
   }
   let stu = new Student('2oops', 20, 200000)
   console.log(stu)
   // Student {name: "2oops", age: 20, price: 200000, getName: ƒ, getPrice: ƒ}
   ```

   只是实现了部分继承，父类的原型上的方法和属性不能继承

   特点：

   - 解决了原型链继承中子类实例共享父类引用属性的问题
   - 创建子类实例时，可向父类传参
   - 可实现多继承（call多个对象）

   缺点：

   - 实例并不是父类的实例，而是子类的实例
   - 只能继承父类的属性和方法，不能继承父类原型的属性和方法
   - 无法实现函数复用，每个子类都有父类实例函数的副本，消耗性能

3. **原型链+构造函数 组合继承**

   关键在于：**通过父类构造函数，继承父类的属性并保留传参的优点，同时将父类实例作为子类原型，实现函数复用，并修复构造函数指向**

   缺点：

   - 子类型最终会包含父类型对象的全部实例属性，但我们不得不在调用子类构造函数时重写这些属性。
   - 调用两次构造函数

4. **组合继承优化1**

   避免组合继承的缺点，父类原型指向子类原型

   ```javascript
   function Person(name) {
     this.name = name
     this.getAge = () => { console.log( '111')}
   }
   Person.prototype.getName = () => { console.log('age')}
   
   function Student(name, age) {
     Person.call(this, name)
     this.age = age
     this.getAge = () => {
       console.log(this.age)
     }
   }
   Person.prototype = Student.prototype
   Student.prototype.sayHello = () => {}
   let stu = new Student('2oops', 20)
   console.log(stu)
   stu.getAge()  // 20
   stu.getName() // 访问不到父类原型属性
   console.log(s1 instanceof Student, s1 instanceof Person)//true true
   console.log(s1.constructor)//Person
   ```

   缺点：

   - 无法确定实例是父类还是子类的

5. **组合继承优化2**

   **借助原型可以基于已有的对象来创建对象**

   ```javascript
   function Person (name, age) {
     this.name = name,
     this.age = age
   }
   Person.prototype.setAge = function () {
     console.log("111")
   }
   function Student (name, age, price) {
     Person.call(this, name, age)
     this.price = price
     this.setScore = function () { }
   }
   Student.prototype = Object.create(Person.prototype)//核心代码
   Student.prototype.constructor = Student//核心代码
   var s1 = new Student('Tom', 20, 15000)
   console.log(s1 instanceof Student, s1 instanceof Person) // true true
   console.log(s1.constructor) //Student
   console.log(s1)  //Student {name: "Tom", age: 20, price: 15000, setScore: ƒ}
   ```

   Student继承了所有的Person原型对象的属性和方法，除私有方法外。

6. **ES6 class继承**

   只是原型的语法糖，本质仍是基于原型实现的

   优点：简单；缺点：并不是所有浏览器都支持class