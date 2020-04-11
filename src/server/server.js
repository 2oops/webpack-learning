const http = require('http')
const url = require('url')
const port = 8080

let serverStart = (route, handler) => {

  let onRequest = (req, res) => {
    let pathname = url.parse(req.url).pathname
    console.log('received pathname', pathname)

    let params = url.parse(req.url, true).query
    route(handler, pathname, res, params)
  }

  let server = http.createServer(onRequest)

  server.listen(port, '127.0.0.1')
  
  console.log(`server started on port : ${port}`)
}

module.exports.serverStart = serverStart