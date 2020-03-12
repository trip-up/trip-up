const CREDENTIALS = {
  ADMIN: 1,
  USER: 2,
  PRIVILEGED: 3
}
const ERRORS = {
  creds: 'Wrong Credentials',
  privileges: { 
    trip: 'Wrong Privileges for trips',

  },
  delete: 'Server error while deleting the resource. Your action not guaranteed.',
  update: 'Server errro while updating your resource. Your action not guaranteed.',
  
}

module.exports = { 
  CREDENTIALS,
  ERRORS
}
