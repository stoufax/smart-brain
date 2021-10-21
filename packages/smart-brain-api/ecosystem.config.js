module.exports = {
  apps: [
    {
      name: 'app',
      script: 'server.js',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root', // user used to authenticate
      host: '51.89.23.86', // where to connect
      key: '~/.ssh/deploy.key',
      ref: 'origin/master',
      repo: 'git@github.com:stoufax/smart-brain.git',
      path: '/var/www/app',
      'post-deploy': 'cd packages/smart-brain-api && npm install && npm run docker && npm start'
    }
  }
};
