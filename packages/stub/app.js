const express = require('express')
const app = express()
const port = process.argv[2] || 4000

const cors = require('cors')
const bodyParser = require('body-parser')

const users = require('./middleware/users')
const profiles = require('./middleware/profiles')
const packets = require('./middleware/packets')

app.use(
    bodyParser.json(), 
    cors(),
    users, 
    profiles, 
    packets
)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening on port '+port+'!'))