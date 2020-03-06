const express = require('express')
const app = express()


app.use(express.json())
let isRunning = false
module.exports = { 
  server: app, 
  start: function (port) {
    if (!isRunning) {
      app.listen(port, () => {
        isRunning = true
        console.log(`Server is listening on ${port}`)
      })
    } else {
      console.error(`server is already running on port ${port}`)
    }
  }
}

