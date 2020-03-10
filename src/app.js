/** 
 * @file app.js
 * @author Trip-Up team
 * @requires express
*/

const express = require('express')

const app = express()

// Middleware
app.use(express.json())

// Routes
const authRouter = require('./routes/users/users-routes')
const roleRouter = require('./routes/roles/roles-route')

app.use(authRouter)
app.use(roleRouter)


// Error catching
const { errorHandler, notFoundHandler } = require('./middleware/errorHandlers')
app.use(notFoundHandler) // 404 error
app.use(errorHandler) //500 error

// Export server
let isRunning = false
module.exports = { 
  server: app, 
  start: function (port) {
    if (!isRunning) {
      app.listen(port, (port) => {
        isRunning = true
        console.log(`Server is listening on ${port}`)
      })
    } else {
      console.error(`server is already running on port ${port}`)
    }
  }
}