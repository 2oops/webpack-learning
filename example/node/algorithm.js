let arr = [1,2,3]
arr.map((item) => {
  return item + 1
})
const arr2 = (new Array(5)).fill([1,2,3])

// 栈 数组的push和pop
const stack = []
stack.push("a")
stack.push("b")
stack.push("c")
stack.push("d")
stack.push("e")
while(stack.length) {
  let top = stack[stack.length - 1]
  console.log(top)
  stack.pop()
}
stack

// 队列 数组的push和shift
const quene = []
quene.push("a")
quene.push("b")
quene.push("c")
while(quene.length) {
  let first = quene[0]
  console.log(first)
  quene.shift()
}
quene

// 链表
function listNode(val) {
  this.val = val
  this.next = null
}
let node1 = new listNode(1)
node1.next = new listNode(2)
let node3 = new listNode(3)
node3.next = node1.next
node1.next = node3 // 新增
node1.next = node3.next // 删除

