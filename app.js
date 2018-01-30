let express = require('express')
let app = express()
let sequelize = require('./db.js')
let User = sequelize.import('./models/user.js')
let port = 3000

User.sync()

app.use(require('body-parser').json())
app.use(require('./middleware/headers'))

app.use('/api/test', (req, res) => {
  res.send('Server says, "Hello!"')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.post('/api/user', (req, res) => {
  let username = req.body.user.username
  let pass = req.body.user.password

  User.create({
    username: username,
    passwordhash: pass
  }).then(
    (user) => res.send({message: 'create user success', data: user}),
    (err) => res.send({message: 'create user failed', data: err.message})
  )
})