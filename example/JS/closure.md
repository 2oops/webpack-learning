**闭包**

1. 函数内部声明的变量，函数外部不可访问，即使使用的`var`声明

2. 什么是闭包：

   当函数可以记住并访问所在的词法作用域，即使函数在当前词法作用域之外执行，这时候就产生了闭包。

3. 闭包特性：

   每个函数天生就是闭包，都能够记住自己定义时的作用域

   ```javascript
   function outer(x) {
   	function inner(y) {
       console.log(x + y)
     }
     return inner
   }
   let inn = outer(3)
   inn(5) // 8
   ```

3. 闭包的内存泄漏：

   栈内存提供了一个执行环境，即作用域

   全局作用域：页面关闭的时候全局作用域才会销毁

   私有作用域：函数执行的时候才会创建

   内存泄漏是指：任何对象在不需要它之后仍然存在，闭包使用完之后，要立即释放资源，将引用变量指向null

4. 闭包的作用：

   - 读取函数内部的变量
   - 用来实现JS模块：具有特定功能的文件，将所有数据和功能都封装在一个函数内部（私有的），只向外暴露一个包含n个方法的对象或函数，模块的使用者调用即可。
   - 使变量的值较长时间保存在内存中，生命周期比较长

5. 闭包的运用：

   ```javascript
   <button>测试1</button>
   <button>测试2</button>
   <button>测试3</button>
   <script type="text/javascript">
      var btns = document.getElementsByTagName('button')
       for (var i = 0; i < btns.length; i++) {
         btns[i].onclick = function () {
           console.log('第' + (i + 1) + '个')
         }
       }
   </script>  
   // 点击任意一个按钮都是显示第四个
   ```

   A：使用let声明解决

   ```javascript
    for (let i = 0; i < btns.length; i++) {
         btns[i].onclick = function () {
           console.log('第' + (i + 1) + '个')
         }
       }
   ```

   B：使用闭包实现

   ```javascript
   for (var i = 0; i < btns.length; i++) {
       (function (j) {
         btns[j].onclick = function () {
           console.log('第' + (j + 1) + '个')
         }
       })(i)
     }
   ```

   



