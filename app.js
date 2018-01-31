require('dotenv').config()
let express = require('express')
let app = express()
let sequelize = require('./db.js')
let port = 3000


app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded())
app.use(require('./middleware/headers'))
app.use(require('./middleware/validate_user'))

app.use('/api/test', (req, res) => {
  res.send('Server says, "Hello!"')
})

app.use('/api/user', require('./routes/user'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
