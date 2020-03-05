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