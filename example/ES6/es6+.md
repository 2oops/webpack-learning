**ES6核心特性**

1. 开发环境  babel  webpack

2. 块级作用域

3. 数组的扩展

   **Array.from()：**将伪数组对象或可遍历对象转换为真数组，（该对象所有键名都是正整数或0，且有length属性。）

   ```javascript
   let obj = { 0: "name", 1: "age", 2: 'area', 3: 4}
   console.log(obj.length)
   Array.from(obj).forEach(item => console.log(item))
   ```

   **Array.of()：****该方法总会创建一个包含所有传入参数的数组，而不管参数的数量与类型

   基本上可以取代**Array()**和**new Array()**，并且不存在由于参数不同导致的重载，它们的行为也是统一的。

   **find&findIndex：**find是返回第一个条件为true的成员，没有则为undefined，findIndex是返回第一个条件为true的元素的位置，都不满足则为-1

   **includes：**

   返回一个布尔值，第二个参数为负表示倒数，默认为0，表示搜素的起始位置。

   对比`indexOf`其更直观，且不会导致对`NaN`的误判

   ```javascript
   [NaN].indexOf(NaN) // -1
   [NaN].includes(NaN) // true
   ```

   **keys、values、entries** 

   ```javascript
   for (let index of ['a', 'b'].keys()) {
     console.log(index);
   }
   // 0
   // 1
   
   for (let elem of ['a', 'b'].values()) {
     console.log(elem);
   }
   // 'a'
   // 'b'
   // 对键值对的遍历
   for (let [index, elem] of ['a', 'b'].entries()) {
     console.log(index, elem);
   }
   // 0 "a"
   // 1 "b"
   ```

4. 箭头函数

   ```javascript
   // this指向改变后的处理
   const team = {
     members:["Henry","Elyse"],
     teamName:"es6",
     teamSummary:function(){
       // 或者let self = this
       return this.members.map(function(member){
         // this不知道该指向谁了
         return `${member}隶属于${this.teamName}小组`;
       }.bind(this))
     }
   }
   console.log(team.teamSummary());//["Henry隶属于es6小组", "Elyse隶属于es6小组"]
   
   // 或者使用箭头函数处理
   const team = {
     members:["Henry","Elyse"],
     teamName:"es6",
     teamSummary:function(){
       return this.members.map((member) => {
         // this指向的就是team对象
         return `${member}隶属于${this.teamName}小组`;
       })
     }
   }
   console.log(team.teamSummary());//["Henry隶属于es6小组", "Elyse隶属于es6小组"]
   ```

   注意：不可以使用yield命令，因此箭头函数不能用作 Generator 函数。