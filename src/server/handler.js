const fs = require('fs')

function api(response, params) {
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
  response.end(JSON.stringify(params))
}

module.exports = {
  api
}