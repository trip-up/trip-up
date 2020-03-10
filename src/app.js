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
const tripsRouter = require('./routes/trips/trips-routes')
const eventRouter = require('./routes/events/events-route')
const tripSignupRouter = require('./routes/trip-signups/trip-signup-routes')

app.use(authRouter)
app.use(roleRouter)
app.use(tripsRouter);
app.use(eventRouter);
app.use(tripSignupRouter);

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