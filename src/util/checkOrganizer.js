const { Trip } = require('../orm/index')

/**
 * 
 * @param {*} trip_id 
 * @param {*} user_id 
 * 
 * return boolean describing if the user is the organizer of the trip they are requesting.
 */
function checkOrganizer (trip_id, user_id) {
  return Trip.findByPk(trip_id).then(result => {
    return result.organizer_user_id === user_id
  })
}

module.exports = checkOrganizer;