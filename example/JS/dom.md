**DOM事件机制**

示例见**example/node/dom.html**

1. DOM级别分为4级：DOM0级、DOM1级、2级、3级；DOM事件分为3个级别：DOM0级事件处理，DOM2级事件处理，DOM3级事件处理，没有1级事件，因为1级中没有事件相关的内容；

   **DOM0级事件**

   在冒泡阶段或者目标阶段执行，只能为同一个元素/标签绑定一个同类型的事件。

   **DOM2级事件**

   **el.addEventListener(event-name, callback, useCapture)**

    useCapture：默认为false，表示子对象是从内向外冒泡还是从外向内，true表示在捕获阶段执行，false表示在冒泡阶段执行。

   IE9以下的IE浏览器不支持 addEventListener()和removeEventListener()，使用 attachEvent()与detachEvent() 代替

   **DOM3级事件**

   - UI事件，当用户与页面上的元素交互时触发，如：load、scroll
   - 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
   - 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dblclick、mouseup
   - 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
   - 文本事件，当在文档中输入文本时触发，如：textInput
   - 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
   - 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
   - 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified
   - 同时DOM3级事件也允许使用者自定义一些事件。

2. DOM事件模型和事件流

   一个事件发生后，会在子元素和父元素之间传播，传播分成三个阶段：捕获、目标、冒泡

   DOM事件模型分为捕获和冒泡。

   捕获是从上到下，window document html(通过document.documentElement获取) body 然后一层层往下走，最后到达目标元素

3. 事件代理（事件委托）

   优点：

   - 减少内存消耗，提高性能
   - 动态绑定事件

   实现：

4. Event对象常见应用

   - event.preventDefault() 默认事件行为不再触发

   - event.stopPropagation() & event.stopImmediatePropagation()

     阻止事件冒泡到父元素，阻止任何父元素事件程序被执行；

     **event.stopImmediatePropagation**既能阻止事件向父元素冒泡，也能阻止元素同事件类型的其它监听器被触发。而 stopPropagation 只能实现前者的效果.

     使用 stopImmediatePropagation后，点击按钮时，不仅body绑定事件不会触发，与此同时按钮的另一个点击事件也不触发。

   - event.target & event.currentTarget

     `event.currentTarget`始终是监听事件者，而`event.target`是事件的真正发出者

