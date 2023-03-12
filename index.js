const express = require('express')
const routes = require('./src/routes')
const db = require('./src/setup/db')
require('dotenv/config');

const app = express()
const port = process.env.PORT || 3000

db.connect();

routes(app)

app.use(express.static('public'))

app.listen(port, ()=>{
    console.log(`Server online on: http://localhost:${port}`)
})