React-Router

1. 路由配置

   `Router Route Link`

   `IndexRoute`

   重定向`Redirect` from to

2. 路由匹配原理

   嵌套关系

   路径语法

   优先级（自顶向下匹配路由）

3. history

   推荐使用browserHistory

   hashHistory

   createMemoryHistory

4. IndexLink和IndexRoute

   `<Link to='/'>Home</Link>`	会使所有组件处于激活状态

   在home路由被渲染后才激活`/`的链接 `<IndexLink to='/'>Home</IndexLink>`

   IndexRoute默认路由

5. 动态路由

   路由是一个非常适用于代码分拆的地方，它的责任就是配置好每一个view

   React-router中的路径匹配和组件加载都是异步完成的，可以延迟加载组件，也可以延迟加载路由配置。

   getChildRoutes, getIndexRoute, getComponents这些函数均是异步执行，且只有在需要时才会调用

6. 跳转前确认

   Lifecycle, routerWillLeave使得组件可以拦截到正在发生的跳转

   返回false则取消跳转，返回提示信息，则在离开前提示用户确认

   父组件mixins RouteContext可以使得子组件mixins Lifecycle后都可以拿到routerWillLeave方法

7. 服务端渲染

8. 组件生命周期

   - 进入`/`路由 App 和默认路由 componentDidMount
   - / => /a  App componentWillReceiveProps componentDidUpdate. Home componentWillUnmount  a. componentDidMount
   - /a/1 => /a/2 App componentWillReceiveProps componentDidUpdate    a receive didupdate
   - /a/2 => /b/3 App componentWillReceiveProps componentDidUpdate.    a  willUnmount.    b didMount

9. 组件外部跳转

   `browserHistory.push('/a')

10. 如何获取上一次路径

    ```javascript
    componentWillReceiveProps(nextProps) {
      const routeChanged = nextProps.location !== this.props.location
    }
    ```