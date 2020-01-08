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
  
