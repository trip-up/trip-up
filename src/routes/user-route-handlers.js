// const User = require('../orm/models/user.schema');
const Sequelize = require('sequelize')
const User = require('../orm/index')
// const User = Sequelize.Model.User

//Sign up 

function signUp (req, res, next) {

console.log('req.body', req.body)
    User.models.user
        .findOrCreate({where: {
            email: req.body.email, 
            name: req.body.name,
            city: req.body.city,
            phone: req.body.phone}})
        .spread(function(user, created) {
            console.log(user.get({
              plain: true
            }))
            console.log(created)
    
    
            res.status(200).json(created)
          })

}

// User
//   .findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
//   .spread(function(user, created) {
//     console.log(user.get({
//       plain: true
//     }))
//     console.log(created)

//     /*
//       {
//         username: 'sdepold',
//         job: 'Technical Lead JavaScript',
//         id: 1,
//         createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
//         updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
//       }
//       created: true
//     */
//   })




//Sign in 



module.exports = {signUp}