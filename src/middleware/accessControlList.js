const { Trip } = require('../orm/index')


function ACL(requiredRole) {
  return function (req, res, next) {
    switch (req.originalUrl.slice(1).split('/')[0]) {
      case 'roles':
        if (req.user.role_id === requiredRole) {
          next();
        } else {
          next('wrong credentials')
        }
        break;
      case 'trips':
        
    

      default :
    next();
  }
} 
}

module.exports = ACL