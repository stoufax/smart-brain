const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');
const morgan = require('morgan');

require('dotenv').config();

const { signinAuthentication } = require('./controllers/signin');
const { handleRegister } = require('./controllers/register');
const { getProfile, updateProfile } = require('./controllers/profile');
const { handleApiCall, handleApiCallCount } = require('./controllers/image');
const auth = require('./controllers/authorization');

const saltRounds = 10;

const db = knex({
  client: 'pg',
  connection: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    ssl: false
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'https://vigorous-joliot-ef76eb.netlify.app' }));
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('its working');
});

app.post('/signin', signinAuthentication(db, bcrypt));

app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt, saltRounds);
});

app.get('/profile/:id', auth.requireAuth, (req, res) => {
  getProfile(req, res, db);
});

app.put('/profile/:id', auth.requireAuth, (req, res) => {
  updateProfile(req, res, db);
});

app.put('/image', auth.requireAuth, (req, res) => {
  handleApiCallCount(req, res, db);
});

app.post('/imageUrl', auth.requireAuth, (req, res) => {
  handleApiCall(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on ' + process.env.PORT + ' PORT');
});
