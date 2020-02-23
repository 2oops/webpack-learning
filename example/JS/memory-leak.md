**垃圾回收和内存泄露**

1. 内存泄露

   简单来说就是不再用到的内存，没有及时释放掉。

2. JS的垃圾回收机制：简单来说就是，找到不再使用的变量等，然后释放掉其占用的内存，这个过程由于开销比较大，所以不是实时的，而是按照固定的时间间隔周期性的执行。
3. 垃圾回收的两种方法：标记清除（最常用）、引用计数

4. 引起内存泄漏的几种情况：

   1. 意外的全局变量

      ```javascript
      function foo() {
        bar = 2
      }
      function abc() {
        this.valiable = 3
      }
      ```

      可以使用严格模式避免这种情况发生。

   2. 被遗忘的定时器或回调函数

   3. 闭包

      ```javascript
      function bindEvent(){
        var obj=document.createElement('xxx')
        obj.onclick=function(){
          // Even if it is a empty function
        }
      }
      //由于函数内定义函数，且内部函数-事件回调还引用了外部函数，因此形成了闭包
      ```

   4. 没有清理的DOM元素引用

5. 内存泄漏识别
   - 打开开发者工具 Performance
   - 勾选 Screenshots 和 memory
   - 左上角小圆点开始录制(record)
   - 停止录制
   - Heap
6. 避免内存泄漏的一些方式：
   - 减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收
   - 注意程序逻辑，避免“死循环”之类的
   - 避免创建过多的对象

7. 垃圾回收使用场景优化

   1. 数组Array化

      ```javascript
      const arr = [1, 2, 3, 4];
      console.log('浪里行舟');
      arr.length = 0  // 可以直接让数字清空，而且数组类型不变。
      // arr = []; 虽然让a变量成一个空数组,但是在堆上重新申请了一个空数组对象。
      ```

   2. 不用的对象尽量设置为null

      ```javascript
      var t = {} // 每次循环都会创建一个新对象。
      for (var i = 0; i < 10; i++) {
        // var t = {};// 每次循环都会创建一个新对象。
        t.age = 19
        t.name = '123'
        t.index = i
        console.log(t)
      }
      t = null //对象如果已经不用了，那就立即设置为null；等待垃圾回收。
      ```

   3. 在循环中的函数表达式，能复用的最好放在表达式外面

      ```javascript
      //推荐用法
      function t(a) {
        console.log(a)
      }
      for (var k = 0; k < 10; k++) {
        t(k)
      }
      t = null
      ```

      