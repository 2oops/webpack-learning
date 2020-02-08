**this**

1. 关于this
   - this代表的是当前行为执行的主体
   - this既不指向函数本身也不指向函数的词法作用域
   - this实际上是在函数发生调用时的绑定，它指向哪里完全取决于函数在哪里被调用

2. this 是谁

   ```javascript
   function fn() {
     console.log(this)
   }
let obj = {fn: fn}
   fn() // this => window
   obj.fn() // {fn: f}
   function sum() {
     fn() // window
   }
   sum()
   var oo = {
     sum: function() {
       console.log(this) // oo
       fn() // window
     }
   }
   oo.sum()
   ```
   
   自执行函数的this永远指向window
   
   `(function(){ //this->window })();`
   
   给元素的某个事件绑定方法，触发事件时，执行该方法，this指向的是当前元素（除IE6~8下的attachEvent)
   
   ```javascript
   oDiv.onClick = function() {
     // this => oDiv
   }
   oDiv.addEventListener('click', () => {
     // this => oDiv
   }, false)
   // IE6~8 attachEvent
   oDiv.attachEvent("click", () => {
     // this => oDiv
   })
   ```

3. 构造函数模式内的this指的是当前类的一个实例

   ```javascript 
   // 如下即是this为p1实例
   function Person(name) {
     this.name = name
     console.log(name) // '2oops'
     console.log(this.name) // '2oops'
   }
   let p1 = new Person("2oops")
   ```

   **类中某一个属性值(方法)，方法中的this需要看方法执行的时候，前面是否有".",才能知道this是谁**

4. **call apply bind**

   call: 执行call方法的时候，让fn方法中的this变为第一个参数值即obj，且可以传值，不同模式下传值不一样

   ```javascript
   let obj={name:"浪里行舟"};
   function fn(){
   console.log(this);//this=>window
   }
   fn();
   fn.call(obj)
   ```

   apply：按数组传参，即**call第二个参数开始接收一个参数列表，apply第二个参数接收一个数组参数**

   ```javascript
   fn.call(obj,100,200);
   fn.apply(obj,[100,200]);
   ```

   bind：IE6～8不兼容，三者都是用来改变this关键字的

   **区别在于：**bind体现了预处理的思想，绑定后并不会立即执行，而前两者是立即执行的

   ```javascript
   fn.call(obj,1,2);//->改变this和执行fn函数是一起都完成了
   fn.bind(obj,1,2);//->只是改变了fn中的this为obj，并且给fn传递了两个参数值1、2，
                        但是此时并没有把fn这个函数执行
   var tempFn=fn.bind(obj,1,2);
   tempFn(); //这样才把fn这个函数执行
   ```

   **此三者绑定的this优先级最高**

5. 箭头函数的指向

   力求简短且不绑定this

   外层有this，即为该this，否则为window

   用call或apply调用箭头函数时，无法绑定this，即传入的第一个参数会被忽略

   ```javascript
   let obj = {
     year: 1995,
     getAge: function(Y) {
       let y = this.year
       let fn = (x) => x - this.year
       return fn.call({year: 2000}, Y) // 第一个参数被忽略
     }
   }
   let age = obj.getAge(2020)
   console.log(age) // 25
   ```

   