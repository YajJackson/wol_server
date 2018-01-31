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
    (user) => res.send({message: 'create user success', data: user, token: jwt.sign({id: user.id}, 'super_secret', {expiresIn: 60*60*24})}),
    (err) => res.send({message: 'create user failed', data: err.message})
  )
})



module.exports = router