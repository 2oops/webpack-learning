const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = "2oops"
  console.log(ctx)
})

app.listen(3000)