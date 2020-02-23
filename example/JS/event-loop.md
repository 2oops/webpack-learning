**浏览器与Node事件循环的区别？**

1. 进程与线程：进程是CPU资源分配的最小单位，线程是CPU调度的最小单位

   进程独立，互不干扰，在一个程序中可以同时运行多个不同的线程来执行不同的任务

2. 浏览器内核

   浏览器常驻线程主要有：GUI渲染线程，JS引擎线程，异步HTTP请求线程，事件触发线程，定时触发线程

3. 浏览器中的Event Loop

   1. 宏任务与微任务，宏任务队列可以有多个，微任务队列只有一个。

      常见宏任务：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等

      微任务：new Promise().then(回调)，nextTick

      宏任务执行，执行完，查看是否有微任务，有，执行微任务，没有，执行最前的宏任务，执行宏中，遇到微任务，依次加入微任务队列，栈空后，再次读取微任务队列里的微任务，依次类推。

      ```javascript
      Promise.resolve().then(()=>{
        console.log('Promise1')  
        setTimeout(()=>{
          console.log('setTimeout2')
        },0)
      })
      setTimeout(()=>{
        console.log('setTimeout1')
        Promise.resolve().then(()=>{
          console.log('Promise2')    
        })
      },0)
      // Promise1 setTimeout1 Promise2 setTimeout2
      ```

4. Node中的Event Loop

   Node.js采用V8作为js的解析引擎，而I/O处理方面使用了自己设计的libuv，libuv是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的API，事件循环机制也是它里面的实现。

   **在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行**。

   process.nextTick 独立于事件循环之外，有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

5. 不同环境事件循环的差异

   浏览器环境下，微任务队列是每个宏任务队列执行完之后执行。Node环境中，微任务会在事件循环的各个阶段（timers`、`poll`、`check）执行，也就是一个阶段执行完毕，就会去执行宏任务队列的任务。

总结：两个环境的微任务的执行时机不同

​	- 浏览器环境，微任务在事件循环的宏任务执行完之后执行

​	- Node环境，微任务在事件循环的各个阶段之间执行。

