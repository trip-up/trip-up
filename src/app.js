// Import packages
const express = require('express')

// Setup express app
const app = express()

// Middleware
app.use(express.json())

// Routes

// Export server
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