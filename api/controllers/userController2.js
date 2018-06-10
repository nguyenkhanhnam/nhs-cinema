const Users = require('../models/userModel')
const responseStatus = require('../configs/responseStatus')
const path = require('path')

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

function editUser (req, user) {
  return new Promise((resolve, reject) => {
    user.username = req.body.username || user.username
    user.phone = req.body.phone || user.phone

    if (!req.files || !req.files.avatar) {
      saveEditUser(user)
        .then(resolve1 => {
          return resolve(resolve1)
        }).catch(reject1 => {
          return reject(reject1)
        })
    } else {
      let avatar = req.files.avatar
      var fileName = new Date().getTime() + '_' + avatar.name
      const pathFile = path.join(__dirname, '/../../public/images/', fileName)
      avatar.mv(pathFile, function (err) {
        if (err) {
          console.log(err)
          return reject(responseStatus.Code500(err))
        } else {
          user.avatar = '/images/' + fileName
          saveEditUser(user)
            .then(resolve1 => {
              return resolve(resolve1)
            }).catch(reject1 => {
              return reject(reject1)
            })
        }
      })
    }
  })
}

function saveEditUser (user) {
  return new Promise((resolve, reject) => {
    user.save(function (err, user) {
      if (err) {
        console.log(err)
        return reject(responseStatus.Code500(err))
      }
      return resolve(responseStatus.Code200({ message: responseStatus.EDIT_PROFILE_SUCCESS }))
    })
  })
}

module.exports = {
  getUser: getUser,
  editUser: editUser
}
