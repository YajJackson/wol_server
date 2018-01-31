let router = require('express').Router()
let sequelize = require('../db')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let User = sequelize.import('../models/user.js')

router.post('/signup', (req, res) => {
  User.create({
    username: req.body.user.username,
    passwordhash: bcrypt.hashSync(req.body.user.password, 10)
  }).then(
    (user) => res.send({message: 'create user success', data: user, token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 })}),
    (err) => res.send({message: 'create user failed', data: err.message})
  )
})

router.post('/signin', (req, res) => {
  User.findOne({ where: { username: req.body.user.username } }).then(
    (user) => {
      if (user) {
        bcrypt.compare(req.body.user.password, user.passwordhash, (err, matches) => {
          matches ?
            res.send({message: 'signin user success', data: user, token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 })}) :
            res.send({message: 'signin user failed, Incorrect password'})
        })
      } else {
        res.send({message: 'signin user failed, User not found'})
      }
    },
    (err) => res.send({message: 'signin user failed', data: err.message})
  )
})

module.exports = router