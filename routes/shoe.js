let router = require('express').Router()
let sequelize = require('../db')
let Shoe = sequelize.import('../models/shoe.js')

router.post('/', (req, res) => {
  Shoe.create({
    shoetype: req.body.shoe.type,
    shoename: req.body.shoe.name,
    shoeurl: req.body.shoe.url
  }).then(
    (shoe) => res.send({message: 'Successfully created a shoe, congrats.', data: shoe }),
    (err) => res.send({message: err.message })
  )
})

router.get('/', (req, res) => {
  Shoe.findAll().then(
    shoes => res.send({message: "found the shoes", data: shoes}),
    err => res.send({message: err.message})
  )
})

router.delete('/', (req, res) => {
  Shoe.destroy({
    where: {id: req.body.id}
  }).then(
    shoe => res.send({message: "successfully deleted shoe", data: shoe}),
    err => res.send({message: err.message})
  )
})

module.exports = router