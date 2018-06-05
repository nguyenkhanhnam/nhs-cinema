var Users = require('../models/userModel')

function getUser (id) {
  return new Promise((resolve, reject) => {
    Users.findById(id.toString, function (err, user) {
      if (err) {
        console.log(err)
        return reject(err)
      }
      if (!user) {
        return reject({ message: 'User not found' })
      }
      return resolve(user)
    })
  })
}

module.exports = {
  getUser: getUser
}
