1. 浏览器的渲染引擎(浏览器内核)：Trident(IE), Gecko(Firefox), Webkit(Safari, Chrome), Blink(Opera)

2. 页面从输入地址到页面加载完成：
  1. 请求DNS服务器得到IP地址
  2. 向该IP地址发起连接请求（3-4）
  3. 成功则发送HTTP请求
  4. 服务器收到请求，处理后返回请求结果
  5. 浏览器得到返回内容处理后渲染

3. 浏览器渲染过程：
  1. 解析文件
    1. W3C标准要求，HTML格式浏览器会解析HTML格式的字符串，HTML字符串描述了一个页面结构，浏览器会把它转换为DOM树形结构；
    2. 解析CSS产生CSS规则树(CSSOM)
    3. JS加载，可以处理DOM和CSSOM
    字节数据 => 字符串数据 => 标签表示Token => Node => DOM(CSSOM)
  2. 解析完成后浏览器引擎开始构造Rendering Tree
  3. 调用操作系统的Native GUI的API绘制

  如果渲染过程中出现JS文件则会停止渲染，等JS引擎运行完，再重新恢复DOM构建，为防止渲染出现不可预期的结果，GUI渲染线程和JS引擎线程是互斥的。

  为了首屏渲染，建议将JS文件放在body底部，或者使用defer或async
  除此之外，JS文件阻塞若引起CSSOM阻塞，会等到CSSOM构建完毕再去构建DOM(因为JS也可操作CSS)

  回流：根据渲染树进行布局，布局即将确切地计算出屏幕的像素，布局完成后，浏览器调用绘制事件，将渲染树转换成屏幕像素。
  
  defer 和 async 的区别
  1. 如果不设置该这些属性，浏览器会立即加载并执行指定的脚本
  2. defer 延迟执行引入的JS，这是加载的HTML文件并不停止解析，这两个操作可以说是并行的。
      等文档解析完毕和所有延迟执行文件都加载完成后，再去触发DOMContentLoaded事件
  3. async 异步执行引入的JS文件，不管HTML文件处于解析阶段还是DOMContentLoaded阶段
      异步JS文件都会执行，但这种方式依然会阻塞load事件，也就是说异步文件的执行一定是在
      loader之前
  4. 两者区别：defer载入JS文件时不阻塞 HTML 的解析，执行阶段被放到 HTML 标签解析完成
      之后。
      在加载多个JS脚本的时候，async是无顺序的加载，而defer是有顺序的加载。

  渲染流程
  1. 计算CSS样式
  2. 构建渲染树
  3. 确定元素坐标和大小 ==> 布局
  4. GUI绘制

  回流和重绘
  重绘：在不需要计算元素几何属性，只是样式变化，如只更改了颜色或背景色引发重绘
  回流：元素被改变了几何属性（元素位置/尺寸/计算 offsetWidth 和 offsetHeight 属性）导致需要重新计算则会引发回流

  如何减少回流和重绘
  1. 使用transform代替top
  2. 使用visibility代替display: none
  3. 少用table布局
  4. 避免层级过多
  5. 将频繁渲染的节点设置为图层，从而避免影响其他节点，如video

  性能优化：
  JS：在不阻塞页面文档解析的情况下，可以使用defer和async
  CSS：可以使用preload加载优先使用的CSS资源