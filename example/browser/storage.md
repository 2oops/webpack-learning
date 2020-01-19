1. Cookie
    来源：Http协议不保存请求和响应之间的通信状态，Cookie的出现可以说就是为了绕开这种无状态协议。
  
  Cookie是某些网站为了辨别用户身份而存储在用户本地终端的数据，服务端生成，客户端维护和存储。以键值对形式
  
  存在。
  应用场景：
  
  1. 购物车
  2. 记住密码，下次自动登录
  3. 记录用户数据，进行广告推荐
  
  生成方式：
  
  set-cookie
  
  2. document.cookie读写，可设置domain标识，若没有设置，则自动绑定到执行语句的当前域

  3. Cookie的缺陷：

       4k,对于不同浏览器而言，4k 是指name=value这里的value值的大小，一个域名下可以有多个cookie，并不是所有的

       cookie去共享这4k大小的空间

       再者cookie紧跟域名，同一个域名下的所有请求，都会携带cookie，对于一些静态资源，本身是不需要cookie的，因

       此可以使用CDN来存储静态文件和主域名分开的方法作处理。

5. Cookie安全：

     value值加密，http-only不能通过JS访问cookie（防止XSS），secure(https),same-site(XSRF)

6. H5新增的LocalStorage & SessionStorage

     共同点：仅在客户端使用，不与服务端通信；大小约为5M；只能存储字符串。

     区别：都遵循同源策略，协议域名端口号下都可以维护存储内容，但是sessionStorage还要求在同一窗口下；

  LocalStorage: 保存的数据永不过期，除非手动删除，内容在同源窗口可以共享

  根据LocalStorage的特点，在第一次请求时，将首屏数据的不变信息直接保存在本地，从而作为一种浏览器缓存方案。

  键值对 ==> 文本格式存储

  localStorage.setItem('key', 'value')

  localStorage.getItem('key')

  应用场景：电商网站的图片在localStorage下存储base64格式的图片

  SessionStorage: 会话级别的浏览器存储（窗口不关闭，会话不清空）

  内容只要不是在同一浏览器下的同一窗口就不能共享，再有一个区别就是存储内容的保存时间不同

  应用场景：保存表单，刷新时也不会清空表单信息；微博使用sessionStorage保存浏览足迹

3. IndexDB
    特点：非关系型数据库，除非被清理，否则一直存在

  键值对存储==>对象仓库，可以存储任意类型的数据

  异步：防止数据大量读写，影响网页性能，相比localStorage是同步的

  支持事物：只要存在失败的事物处理则失败，且会会到之前的状态，不会说只修改了一部分数据

  支持二进制存储：ArrayBuffer和blob

  同源限制：不能跨域访问数据库

  存储空间大（250M）

  常见操作：
  window.indexedDB.open('testDB')
  window.indexedDB.DeleteDatabase(indexdb)
  function closedb(db) {
    db.close()
  }
  应用场景：用于客户端存储大量的结构化数据