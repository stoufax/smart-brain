module.exports = {
  apps: [
    {
      name: 'Backend & webapp',
      script: 'src/server.js',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '51.89.23.86',
      key: '~/.ssh/deploy.key',
      ref: 'origin/master',
      repo: 'git@github.com:stoufax/smart-brain.git',
      path: '/var/www/app',
      'post-deploy': 'yarn setup && yarn build:frontend && yarn docker && yarn start:backend'
    }
  }
};
