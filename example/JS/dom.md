**DOM事件机制**

示例见**example/node/dom.html**

1. DOM级别分为4级：DOM0级、DOM1级、2级、3级；DOM事件分为3个级别：DOM0级事件处理，DOM2级事件处理，DOM3级事件处理，没有1级事件，因为1级中没有事件相关的内容；

   **DOM0级事件**

   **DOM2级事件**

   **DOM3级事件**

2. DOM事件模型和事件流

3. 事件代理（事件委托）

   优点：

   - 减少内存消耗，提高性能
   - 动态绑定事件

   实现：

4. Event对象常见应用

   - event.preventDefault() 默认事件行为不再触发

   - event.stopPropagation() & event.stopImmediatePropagation()

     阻止事件冒泡到父元素，

   - event.target & event.currentTarget

