const HTTP = require('http')
const QS = require('querystring')

HTTP.createServer((req, res) => {
  res.writeHead(200)
  res.end('hello 2oops')
}).listen(8000)

console.log("process.id", process.pid)
// console.log('process env url', process.env)

HTTP.createServer((req, res) => {
  let postData = ""
  req.setEncoding('utf8')

  req.on('data', (trunk) => {
    postData += trunk
  })

  req.on('end', () => {
    res.end(postData)
  })
}).listen(80)
console.log("server started")