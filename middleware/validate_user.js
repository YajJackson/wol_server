let jwt = require('jsonwebtoken')
let sequelize = require('../db.js')
let User = sequelize.import('../models/user.js')

module.exports = function(req, res, next) {
  let sessionToken = req.headers.authorization

  if(!req.body.user && sessionToken) {
    jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
      if(decoded) {
        User.findOne({ where: { id: decoded.id } }).then(
          (user) => {
            req.user = user
            next()
          },
          (err) => res.send({message: 'Error: not authorized', data: err.message})
        )
      } else {
        res.send({ message: 'Error: not authorized'})
      }
    })
  } else {
    next()
  }
}