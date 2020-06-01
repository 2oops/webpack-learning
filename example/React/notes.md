React

1. React.Component和React.PureComponent的区别

   - 继承PureComponent时，不能再使用ShouldComponentUpdate，否则会报错
   - 继承PureComponent时，进行的是浅比较，只会比较数据的引用指针是否改变，而不会比较该地址所存的数据

   React为函数式组件提供了一个memo方法，它与PureComponent的区别在于只对props进行了浅比较，用法简单，直接将函数传入memo中导出即可，仅适用于无状态组件和状态数据非常简单的组件。

   扩展：

   1. 为了解决浅比较带来的问题，使用shouldComponentUpdate进行深层次比对，递归props中的所有属性和值然后进行比对。

   2. 回归问题的本质，我们最终想知道都是props的状态是否改变，由此带出第三种解决方案：immutable+shouldComponentUpdate(memo)
   3. immutable内部采用多叉树的结构，如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享

2. Immutability 持久性数据结构（**Persistent Data Structure**）处理的库，利用结构共享（ **Structural Sharing**）形成的持久性数据结构

   - 复杂逻辑简单化
   - 可以检测到变化
   - 确定重新渲染的时间

   immutable对象和Js对象要注意转换，不能混用，调用fromJS， toJS即可

   ```javascript
   // formJS js转immutable对象
   import {fromJS} from 'immutable'
   const immutableState = fromJS({ count: 0})
   // toJS
   const jsObj = immutableState.toJS()
   // get/getIn 获取immutable对象属性
   let jsObj = {a: 1}
   let res1 = jsObj.a
   let immutableObj = fromJS(jsObj)
   let res2 = immutableObj.get('a')
   let jsObj2 = {a: {b: 1}}
   let res3 = jsObj.a.b
   let immutableObj1 = fromJS(jsObj2)
   let res4 = immutableObj2.getIn(['a', 'b'])
   // set
   immutableObj.set('a', 2)
   // merge 修改并合并
   immutableObj.merge({
     a: 2,
     b: 3
   })
   ```

   优点：

   - 节省内存（结构共享）
   - 降低了mutable带来的复杂度
   - undo/redo copy/paste
   - 并发安全，不再需要并发锁
   - 函数式编程

   如何避免对象混淆：

   - 类型检查工具Flow或TS
   - 约定变量命名规则
   - 尽量使用Immutable.fromJS()而不是Immutable.List和Map

   immutable判断数据是否变化：

   ```javascript
   import {is} from 'immutable'
   
   shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
     const thisState = this.state || {}, thisProps = this.props || {}
     if(Object.keys(thisState).length !== Object.keys(nextState).length ||
       Object.keys(thisProps).length !== Object.keys(nextProps).length) {
         return true
       }
   
     for(const key in nextProps) {
       if(!is(thisProps[key], nextProps[key])) {
         return true
       }
     }
   
     for(const key in nextState) {
       if(thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
         return true
       }
     }
     return false
   }
   ```

3. 函数式组件和类组件的区别

   - 静态组件多用函数式组件

4. react渲染机制

   - props或state更新
   - render函数返回不同的元素树
   - 新旧DOM树比对diff
   - 针对差异的地方进行更新
   - 渲染为真实DOM树

5. shouldComponentUpdate()
   - 控制是否发生 VDOM 树的 diff 过程
6.  const和Object.freeze()的区别
   - const无法重新分配变量，但是可以改变对象本身
   - Object.freeze()只是冻结了表层，深层的具有嵌套属性的对象不会被冻结