const axios = require('axios')

axios.post('/127.0.0.1:80', {
  name: '2oops',
  age: 20
}).then(res => {
  console.log(res.data)
}).catch(err => {
  console.log(err)
})