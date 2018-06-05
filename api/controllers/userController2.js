var Users = require('../models/userModel')
var responseStatus = require('../configs/responseStatus')

function getUser (id) {
  return new Promise((resolve, reject) => {
    Users.findById(id.toString, function (err, user) {
      if (err) {
        console.log(err)
        return reject(err)
      }
      if (!user) {
        return reject(responseStatus.Code404({ errorMessage: responseStatus.USER_NOT_FOUND }))
      }
      return resolve(user)
    })
  })
}

module.exports = {
  getUser: getUser
}
