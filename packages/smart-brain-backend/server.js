const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const knex = require('knex')
require('dotenv').config()

const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const saltRounds = 10
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
})
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('its working')
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds)
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

app.post('/imageUrl', (req, res) => {
  image.handleApiCall(req, res, db)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running')
})

/*

/ --> res = this working
/ signin --> POST = success/fail
/register --> POST = user
/profile/:uderId --> GET = user
/image --> Put

*/
