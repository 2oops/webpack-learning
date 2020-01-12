1. Cookie
  来源：Http协议不保存请求和响应之间的通信状态，Cookie的出现可以说就是为了绕开这种无状态协议。
  Cookie是某些网站为了辨别用户身份而存储在用户本地终端的数据，服务端生成，客户端维护和存储。以键值对形式存在。
  应用场景：
  1. 购物车
  2. 记住密码，下次自动登录
  3. 记录用户数据，进行广告推荐
  生成方式：
  1. set-cookie
  2. document.cookie读写，可设置domain标识，若没有设置，则自动绑定到执行语句的当前域
  Cookie的缺陷：
  4k,对于不同浏览器而言，4k 是指name=value这里的value值的大小，一个域名下可以有多个cookie，并不是所有的cookie去共享这4k大小的空间
  再者cookie紧跟域名，同一个域名下的所有请求，都会携带cookie，对于一些静态资源，本身是不需要cookie的，因此可以使用CDN来存储静态文件和主域名分开的方法作处理。
  Cookie安全：
  value值加密，http-only不能通过JS访问cookie（防止XSS），secure(https),same-site(XSRF)

2. H5新增的LocalStorage & SessionStorage
3. IndexDB
  键值对存储
  异步
  支持事物
  支持二进制存储
  同源限制
  存储空间大（250M）