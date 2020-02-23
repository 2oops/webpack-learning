**函数式编程**

1. 函数式编程的核心思想：通过函数对数据进行转换，通过串联多个函数求结果

   ```javascript
   // 对句子单词首字母大写
   let string = 'functional programming is greater'
   let res = string.split(' ').map(v => v.slice(0,1).toUpperCase() + v.slice(1)).join(' ')
   console.log(res)
   ```

2. 命令式编程和声明式编程

3. 常见特性

   - 无副作用：调用函数时不会修改外部状态

   - 透明引用

     ```javascript
     let a = 1;
     let b = 2;
     // 函数内部使用的变量并不属于它的作用域
     function test1() {
       return a + b;
     }
     // 函数内部使用的变量是显式传递进去的
     function test2(a, b) {
       return a + b;
     }
     ```

   - 不可变变量：指一个变量创建后，就不能在进行修改，任何修改都会生成一个新的变量，使用不可变变量的最大好处是线程安全。多个线程可以访问同一个不可变变量，让并行更容易实现。JS原生不支持不可变变量，需借助第三方库。
   - 函数是一等公民（可作为参数传递等）

4. 常见的函数式编程模型

   1. 闭包

      闭包的弊端：持久化变量不会被正常释放，持续占用内存空间，容易造成内存浪费。

   2. 高阶函数

      是指一个函数以函数作为参数或者以函数作为返回值，或者既以函数作为参数又以函数作为返回值。

      ```javascript
      // 使用高阶函数map获取所有name值
      let animals = [
        {name: 'dog', age: 10},
        {name: 'cat', weight: 2},
        {name: 'tigger', age: 20}
      ]
      let names = animals.map(n => n.name) // ["dog", "cat", "tigger"]
      
      // filter 不会改变原数组，返回的是过滤后的新数组，获取所有狗物种的对象
      let animals = [
        { name: "Fluffykins", species: "rabbit" },
        { name: "Caro", species: "dog" },
        { name: "Hamilton", species: "dog" },
        { name: "Harold", species: "fish" },
        { name: "Ursula", species: "cat" },
        { name: "Jimmy", species: "fish" }
      ];
      let dogs = animals.filter(s => s.species === 'dog')
      console.log(dogs)
      
      // reduce数组求和
      let arr = [1,2,3,4]
      let res = arr.reduce((a, b) => a + b, 1) // 11
      ```

   3. 函数柯里化

      柯里化又称部分求值，柯里化函数会接收一些参数，接收后并不会立即求值，而是继续返回一个新函数，传入的参数通过闭包的形式保存，真正求值的时候再一次性把参数传入进行求值。

      ```javascript
      // 普通函数
      function add(x, y) {
        return x + y
      }
      // 柯里化函数
      function add2(x) {
        return function(y) {
          return x + y
        }
      }
      let increment = add2(1)
      increment(2)
      ```

      某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法！

   4. 函数组合

      ```javascript
      let compose = (f, g) => (x => f(g(x)))
      let add1 = x => x + 1
      let mult5 = x => x * 5
      compose(add1, mult5)(3) // 16
      ```

      