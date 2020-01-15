const HTTP = require('http')

HTTP.createServer((req, res) => {
  res.writeHead(200)
  res.end('hello 2oops')
}).listen(8000)

console.log("process.id", process.pid)