**作用域/执行上下文/执行栈**

**作用域**

1. ES6之前JS没有块级作用域，只有全局作用域和函数作用域

2. 因为作用域的原因，类似JQuery Zepto等库的源码都会使用`(function(){....})()`

3. 作用域是分层的，内层的作用域可以访问外层作用域的变量

4. 作用域链：

5. 作用域和执行上下文：

   JS为解释型语言，其执行分为解释和执行两个阶段：

   解释阶段：词法分析，语法分析，作用域规则确定

   执行阶段：创建执行上下文，执行函数代码，垃圾回收

   执行上下文在运行时确定，随时可能改变；作用域在编码的时候就确定了，不会改变；

   同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同变量的值。

**执行上下文**

1. 变量提声明提升

   ```javascript
   console.log(a) // undefined而不会报错
   let a = 10
   ```

2. 函数声明提升

   ```javascript
   console.log(f1) // function f1(){}
   function f1() {} // 函数声明
   console.log(f2) // undefined
   var f2 = function() {} // 函数表达式
   ```

   变量和函数都会上升，在函数表达式声明时，就会将`var f2`上升到函数体顶部，然而此时f2为undefined

   在函数和变量同名且都会被提升的情况下，函数声明提升的优先级更高

3. 确定this的指向

   this的指向是执行上下文环境的一部分，执行的时候才能确认，定义的时候确认不了

**执行栈**

可以把执行栈看作是一个存储函数调用的栈结构，遵循先进后出的原则

记住以下几点：

- JS单线程，程序都是顺序执行
- 浏览器执行全局代码时，首先创建全局的执行上下文，压入执行栈的底部
- 每当进入一个函数就会创建函数的执行上下文，压入栈中，当前函数执行完后，执行上下文出栈，等待垃圾回收
- 浏览器的JS执行引擎总是执行的栈顶的执行上下文
- 全局上下文只有一个，在浏览器关闭时出栈

