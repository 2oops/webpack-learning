let express = require("express")
let app = express()

app.get('/say', (req, res) => {
  let { wd, callback } = req.query
  console.log(wd)
  console.log(callback)
  res.end(`${callback}('Iloveyoutoo')`)
})

app.listen(3000)