let express = require('express')
let app = express()

let port = 3000

app.use('/api/test', (req, res) => {
  res.send('Server says, "Hello!"')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})