module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',
    instances: 4,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }],
};
