const { Trip } = require('../orm/index')
const checkOrganizer = require('../util/checkOrganizer')
const { CREDENTIALS, ERRORS }  = require('../../config/serverSettings')


function ACL(requiredRole) {
  return function (req, res, next) {
    
    switch (requiredRole) {
      case CREDENTIALS.ADMIN:
        if (req.user.role_id === CREDENTIALS.ADMIN) {
          next();
        } else {
          next(ERRORS.creds,);
        }
        break;

      case CREDENTIALS.USER:
        if (req.user.role_id === CREDENTIALS.USER  || req.user.role_id === CREDENTIALS.ADMIN) next()
        else next (ERRORS.creds)

      case CREDENTIALS.PRIVILEGED:
        if (req.params.trip_id) {
          const isOrganizer = checkOrganizer(req.params.trip_id, req.user.id);
          const isAdmin = req.user.role_id === 1;
          if (req.method === 'DELETE' && (isOrganizer || isAdmin) ) next()
          if (req.method === 'PUT' && (isOrganizer || isAdmin) ) next()
          if (req.method === 'GET') next() //what situations could get us here? //this is get one.
          else next(new Error(ERRORS.privileges.trip))
        } else { //no params
          if (req.method === 'GET') next() //what situations could get us here? //this is get all
          if (req.method === 'POST') next() //and what about here? 

        }
      default :
    next();
  }
} 
}

module.exports = ACL