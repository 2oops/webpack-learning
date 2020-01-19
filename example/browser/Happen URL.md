网址输入到页面呈现发生了什么

1. DNS解析域名为IP地址
2. TCP连接：三次握手
3. 发送请求
4. 请求成功，服务器返回HTTP报文
5. 浏览器解析后页面渲染
6. 四次挥手

***

URL相关：Uniform Resource Location 统一资源定位符

**scheme://host.domain:port/path/filename**

Scheme: 因特网定义的服务类型，包括http /https /ftp/ file等

***

域名解析过程

1. 浏览器缓存中找
2. 操作系统缓存
3. 路由器缓存
4. ISP（网络服务提供商）的DNS服务器中查找
5. 根服务器递归查询

DNS服务器查询到相应的IP地址后，返回给浏览器，浏览器再将协议打在协议上，同时请求参数也搭载在协议上，一并发送给服务器。

