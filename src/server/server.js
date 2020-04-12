const http = require('http')
const url = require('url')
const querystring = require('querystring')

const port = 8081

let serverStart = (route, handler) => {

  let onRequest = (req, res) => {
    let pathname = url.parse(req.url).pathname
    console.log('received pathname', pathname)
    // let result = ""
    let result = []
    req.on('error', err => {
      console.log(`请求发生错误: ${err}`)
    }).on('data', chunk => {
      console.log(`请求接收到了数据：${chunk}`)
      // result += chunk
      result.push(chunk)
    }).on('end', () => {
      console.log(`请求结束了`)

      if(req.method === 'post') {
        // 发送数据量过大时取消请求
        if(result.length > 1e6) {
          req.connection.destory()
        }
        result = Buffer.concat(result).toString();
        route(handler, pathname, res, querystring.parse(result))
      } else {
        let params = url.parse(req.url, true).query
        route(handler, pathname, res, params)
      }
    })
  }

  let server = http.createServer(onRequest)

  server.listen(port, '127.0.0.1')
  
  console.log(`server started on port : ${port}`)
}

module.exports.serverStart = serverStart