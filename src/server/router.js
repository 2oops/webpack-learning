const fs = require('fs')

function route(handler, pathname, response, params) {
  console.log(`routing request for ${pathname}`)
  if(typeof handler[pathname] === 'function') {
    handler[pathname](response, params)
  } else {
    response.writeHead(200, {"Content-Type": "text/html"})
    fs.createReadStream(`${__dirname}/404.html`, 'utf8').pipe(response)
  }
}

module.exports.route = route