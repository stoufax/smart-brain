const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const path = require('path');

const { signinAuthentication } = require('./controllers/signin');
const { handleRegister } = require('./controllers/register');
const { getProfile, updateProfile } = require('./controllers/profile');
const { handleApiCall, handleApiCallCount } = require('./controllers/image');
const auth = require('./controllers/authorization');

const saltRounds = 10;
const webappPath = path.resolve(__dirname, '../wwwroot');

const db = knex({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    ssl: false
  }
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use(serveStatic(webappPath));
app.use(registerIndexFallbackRoutes());

app.use('/api/v1', registerRoutes());

function registerRoutes() {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('Server is alive!');
  });

  router.post('/signin', signinAuthentication(db, bcrypt));

  router.post('/register', (req, res) => {
    handleRegister(req, res, db, bcrypt, saltRounds);
  });

  router.get('/profile/:id', auth.requireAuth, (req, res) => {
    getProfile(req, res, db);
  });

  router.put('/profile/:id', auth.requireAuth, (req, res) => {
    updateProfile(req, res, db);
  });

  router.put('/image', auth.requireAuth, (req, res) => {
    handleApiCallCount(req, res, db);
  });

  router.post('/imageUrl', auth.requireAuth, (req, res) => {
    handleApiCall(req, res, db);
  });

  return router;
}

function registerIndexFallbackRoutes() {
  const router = express.Router();

  router.use((request, response, next) => {
    if (request.url.startsWith('/api')) return next();
    if (request.method !== 'GET') return next();

    response.setHeader('Cache-Control', 'public, max-age=0, no-cache');
    response.sendFile(webappPath + '/index.html');
  });

  return router;
}

module.exports = app;
