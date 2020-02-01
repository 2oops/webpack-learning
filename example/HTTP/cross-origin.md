**跨域**

1. 同源策略

   这是浏览器最基本也是最核心的功能，是一种约定，从而防止浏览器受到**XSS/CSRF**攻击。

   同源即是指**协议+域名+端口号**相同。

   **限制内容：**

   - cookie/localstorage/indexDB等存储性内容

   - 请求响应
   - DOM节点

   `<img src="xxx"> <link href="xxx"> <script src="xxx">`

   跨域问题上，是通过**URL首部**来判断的是否跨域，而不是IP地址，且由于协议和端口号造成的跨域问题是需要后段配合的，**跨域并不是说请求发不出去，而是结果被浏览器拦截了。**

2. 跨域解决方案

   **JSONP**

   利用**<script>**标签允许跨域加载资源的漏洞

   优点：简单兼容性好

   缺点：不安全易遭受**XSS攻击**，只支持GET请求。

   实现方式：见**jsonp/index.html**

   **CORS**

   需要浏览器和后端支持，IE8/9需要通过XDomainRequest实现

   会出现简单请求和复杂请求：

   简单请求：同时满足以下两大条件即为简单请求

   - GET/HEAD/POST三种方法之一
   - Content-Type为以下之一：`text/plain  mutipart/form-data   application/x-www-form-urlencoded`

   复杂请求：除简单请求之外即是复杂请求，正式通信之前会发送一个**options类型的预检请求**，以此来获知服务器是否支持跨域请求。

   实现方式：**cors/index.html**

   **postMessage**

   HTML5 XMLHttpRequest Level 2中的API，是可以跨域操作的window属性之一，

   可解决下面问题：

   - 页面和其打开的新窗口的数据传递
   - 多窗口之间消息传递
   - 页面与嵌套的iframe消息传递
   - 上面三个场景的跨域数据传递

   实现方式：**postMessage/**

   **websocket**

   全双工通信，连接时需要HTTP协议，连接成功后与HTTP无关

   **Node中间件代理（两次跨域）**

   服务器向服务器请求无需遵循同源策略，那么就可以使用一个代理服务器来接收请求，然后将请求发送给资源服务器，然后将从资源服务器拿到的请求结果返回给客户端。
   
   **nginx反向代理**
   
   只需配置nginx即可实现跨域，支持浏览器，支持session，且不会影响服务器性能。
   
   