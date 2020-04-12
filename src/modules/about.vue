<template>
  <div>
    <el-button size="small" type="primary" @click="onClick">Click</el-button>
  </div>
</template>

<script>
import '../assets/layout.less'

const axios = require('axios')
export default {
  data() {
    return {

    }
  },

  methods: {
    onClick() {
      axios.get('http://localhost:8081/api', {
        params: {
          name: '2oops',
          age: 22
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      }).then(result => {
        console.log(result)
      })

      // axios.post('http://localhost:8081/api', {
      //   name: '2oops',
      //   age: 21
      // }).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  }
}
</script>