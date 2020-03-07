**性能优化**

**资源压缩与合并**

**非核心代码异步加载**

1. defer和async的区别

   defer是HTML解析完之后再执行，如果有多个，则按照加载的顺序依次执行

   async是加载完之后立即执行，如果是多个，执行顺序和加载顺序无关

**浏览器缓存**

1. 浏览器缓存
   - 强缓存
   - 协商缓存

**CDN**

Content Delivery Network 内容分发网络

**DNS预解析**

`<link rel="dns-prefetch" href="//example.com">`

假如有大量图片需要从该网站请求，那么可以在文档顶部标签假如以上内容，以节省DNS解析时间。

浏览器会对a标签自动启用DNS预解析，所以a标签里的域名不需要在head里面添加link，但在https协议中不起作用，主要是为了防止窃听者根据预解析推断显示在https页面超链接的主机名，可使用以下语句强制开启

`<meta http-equiv="x-dns-prefetch-control content='on'">

***

**懒加载和预加载**

1. 懒加载

   懒加载也即延迟加载，多用于在长图片网页中延迟加载图片，可以提升用户体验、避免首屏加载太多资源、防止并发加载的资源造成JS阻塞。

   **原理：**将页面上的图片的src属性置为空字符串，然后真实的地址放在`data-original`属性中，当页面滚动的时候监听`scroll`事件，在事件的回调中，判断需要懒加载的图片是否进入可视区域，如果图片在可视区域内就将src属性设置为`data-original`的值，这样就可以实现懒加载。

   **实现：**见`./lazy-load.html`

2. 预加载

   将所需的资源提前加载到本地，这样在要使用的时候直接从本地缓存获取

   **实现：**

   - html标签 `<img src="http://pic26.nipic.com/20121213/6168183 0044449030002.jpg" style="display:none"/>`
   - 使用[PreloadJS库](https://createjs.com/preloadjs)
   - 使用XMLHttpRequest对象,虽然存在跨域问题，但会精细控制预加载过程
   - PreloadJs配合Image对象

   **懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力**

***

**函数节流和防抖**

1. 函数节流

   一个函数执行一次后，只有大于设定的执行周期后才会执行第二次

   **实现原理：**利用时间戳来判断是否过了设定的周期，记录上次的执行时间戳，然后scroll事件每次触发的时候都执行回调，回调中判断当前时间戳距离上次时间戳是否大于设定的执行周期，是，则执行，并更新执行时间戳。

   见`./lazy-load.html`

   应用场景：

   - mousemove(计算鼠标移动距离)

   - mousedown/keydown（射击游戏的点击）

   - 监听滚动事件判断是否到达页面底部以加载更多

2. 函数防抖

   一个需要频繁执行的函数，在规定时间内，只让最后一次生效

   **实现原理：**使用定时器，比如说，在第一次点击的时候，调用函数，在函数内部创建一个定时器，在指定的时间间隔之后运行代码。

   见`./lazy-load.html`

   应用场景：

   - 每次 resize/scroll 触发统计事件
   - 文本的输入验证（针对需要发请求的输入验证）

***

**常见六大web安全攻防解析**

1. XSS(Cross site scripting)

   **原理**：攻击者往web页面里插入恶意可执行网页脚本代码，当用户浏览网页时，嵌入其中的恶意代码被执行，从而达到盗取用户信息或其他隐私信息的目的

   又分为：

   - 非持久型XSS攻击（反射型）

     一般是通过给别人发送带有恶意攻击脚本代码参数的URL，当访问时，恶意代码被解析、执行

     为防止反射型XSS攻击，需注意一下几点：

     web页面渲染的所有数据或者内容都必须来自于服务器

     尽量不要从URL及DOM API中获取内容渲染

     做好escape转义

   - 持久型XSS攻击（存储型）

     主要通过表单提交等方式将内容由正常操作存入数据库，当页面获取数据时正好将注入代码渲染执行。

     攻击成功需同时满足以下条件：

     post请求的表单提交未经转义就存入数据库

     后端未经转义就将数据从数据库提取给到前端

     前端拿到数据后未经过转义就渲染

   **防御：**

   - CSP（建立白名单）（兼容性好）

     ```javascript
     // 两种方式开启CSP，设置请求头的Content-Security-Policy或者设置meta标签的方式
     Content-Security-Policy: default-src 'self' // 只允许本站资源加载
     Content-Security-Policy: img-src https://* // 只允许加载https图片
     ```

   - 转义字符，对引号、尖括号、斜杠进行转义

     ```javascript
     const xss = require('xss')
     let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
     // -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
     console.log(html)
     //js-xss库实现转义
     ```

   - HttpOnly Cookie（通过JS无法访问到cookie，防止窃取cookie信息）

2. CSRF（Cross site request forgery)跨站请求伪造

   利用用户已登录的身份，在用户不知情的情况下非法操作

   **防御：**

   - samesite

     对cookie设置samesite属性后，表示cookie不随跨域请求发送，可以很大程度的减少CSRF攻击，但不是所有浏览器兼容

   - Referer check

     一般浏览器发起请求时，会携带referer告诉服务器是哪个页面发起的请求。由此，在提交表单时，提交的referer必定是该页面发起的请求，由此可判断是不是CSRF攻击。即使如此，也无法完全依赖该方法去防御CSRF攻击

   - Token

     这是一个比较完善的解决方案，在发送请求时，http请求以参数的形式加入一个随机产生的token，服务端建立一个拦截器，验证这个token，服务器读取浏览器当前域cookie中的token值，校验请求中的token值和cookie中的token值是否存在且相等，以此判断是否为合法请求。

   - 验证码

     会影响用户体验，建议在关键业务点上使用验证码

3. 点击劫持

   视觉欺骗，将想要攻击的网站通过iframe的方式嵌入到自己网页中，然后给iframe设置为透明，用户以为点击的正常的网站，实际上是被骗取了操作。

   **防御：**

   - X-FRAME-OPTIONS响应头，这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击

     DENY表示页面不允许通过 iframe 的方式展示、Sameorigin可以在相同域名下通过 iframe 的方式展示、Allow-from以在指定来源的 iframe 中展示
   
   - JS 防御

4. URL跳转漏洞

5. SQL注入

   本质：数据和代码未分离，数据当作了代码来执行

6. OS命令注入攻击





