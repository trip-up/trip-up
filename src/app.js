/** @module app */
/** Import packages */
const express = require('express')

/** Setup express app */
const app = express()

// Middleware
app.use(express.json())

const authRouter = require('./routes/users-routes')

app.use(authRouter)

// Routes

//Sign up
//Sign in
//Get all users 
//Get one user 
//Post route to create a trip 
//Update route to update trip 
//Delete route to delete trip 
//Delete users route for admin 

// Test route
const ROUTEBASE = process.env.ROUTEBASE
app.get(`${ROUTEBASE}/about`, (req, res) => {
  res.status(200).json({ 
    about:'Trip-Up is an API to help you plan all your group trips!',
    help:'place help here'
  })
})

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