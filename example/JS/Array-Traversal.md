**数组遍历的方法：forEach map filter find every some reduce **

共同点：都不会改变原始数组

**forEach**

```javascript
let arr = [1,2,3,4,5]
let sum = 0
arr.forEach(num => sum += num)
console.log(sum)
```

**map**：将数组映射成另一个数组，其通过指定函数处理每个数组元素，然后返回处理后的新的数组，同样不会改变原来的数组。

```javascript
let arr = [1,2,3]
let res = arr.map( num => {
  return num * 2
})
console.log(arr)
console.log(res)

// 场景二
// 将对象数组中某属性的值输出到另一个数组中
let car = [
  {type: '5S', price: '200'},
  {type: '7S', price: '300'}
]
let prices = car.map(item => {
  return item.price
})
console.log(prices)
```

**filter**：从数组中找出所有符合条件的元素

```javascript
let car = [
  {type: '5S', price: '200'},
  {type: '7S', price: '300'}
]
let filteredType = car.filter(item => {
  return item.type === '5S'
})
console.log(filteredType) // {type: "5S", price: "200"}

// 场景2
// 假定两个数组A和B，根据A中的值过滤掉B中不符合的数据
let valiableId = {id: 4, title: 'aa'}
let ids = [
  {id: 4, title: 'bb'},
  {id: 5, title: 'cc'},
  {id: 3, title: 'dd'}
]
function filterId(valiableId, ids) {
  return ids.find(item => {
    return item.id === valiableId.id
  })
}
console.log(filterId(valiableId, ids)) // {id: 4, title: "bb"}
```

**find**：返回通过测试的数组的第一个元素

```javascript
let arr = ['-', '1', '2']
let res = arr.find(item => {
  return item !== '-'
})
console.log(res) // 1
// 场景2 同filter
```

**every & some**：every一假即假，some一真即真

```javascript
let a = [1, 2, 3, 4]
let some = a.some(item => {
  return item > 2
})
let every = a.every(item => {
  return item < 5
})
console.log(some, every) // true, true
// 场景2 校验表单是否全部校验成功，校验数组全为true
```

**reduce**：可用作累加器，从左往右累加数组元素，最后得到一个值

```javascript
let arr = [1,2,3,4]
let res = arr.reduce((x, y) => {
return x + y}, 0) // 0 为x的初始值
console.log(res)
// 场景2 将数组中对象的某个属性抽离到另一个数组中
let color = [
  {color: '2'},
  {color: '1'},
  {color: '2', title: 2}
]
let res = color.reduce((previous, target) => {
  previous.push(target.color)
  return previous
}, ['5'])
console.log(res) // ["5", "2", "1", "2"]
//场景3 判断字符串是否对称
function balancedParens(string){
  return !string.split("").reduce(function(previous,char){
    if(previous < 0) { return previous;}
    if(char == "("){ return ++previous;}
    if(char == ")"){ return --previous;}
    return previous;
  },0);
}
console.log(balancedParens("((())))"));
```

