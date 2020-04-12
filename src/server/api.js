const server = require('./server')
const router = require('./router')
const handler = require('./handler')

let handle = {}

handle['/api'] = handler.api

server.serverStart(router.route, handle)