**this**

1. 关于this
   - this代表的是当前行为执行的主体
   - this既不指向函数本身也不指向函数的词法作用域
   - this实际上是在函数发生调用时的绑定，它指向哪里完全取决于函数在哪里被调用

2. this 是谁

   ```javascript
   function fn() {}
   console.log(this)
   ```

   