// 命令行读取文件
// node read demo.js

const recast = require('recast')
const TNT = recast.types.namedTypes

recast.run( function(ast, printSource){
  printSource(ast),
  recast.visit(ast, {
    visitExpressionStatement: function({node}) {
      console.log(node)
      if(TNT.ExpressionStatement.check(node)) {
        console.log('this is a ExpressionStatement')
      }
      printSource(node)
      return false
    }
  })
})