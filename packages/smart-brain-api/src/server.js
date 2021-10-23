const path = require('path');
const http = require('http');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { ensureEnvironmentVariables } = require('./common/environment-variables');
const app = require('./app');

ensureEnvironmentVariables(['CLARIFAI_API', 'REDIS_URI']);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log('server is running on ' + process.env.PORT + ' PORT');
});
