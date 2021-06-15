module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_ENDPOINT: '"http://localhost:5000/api"'
  })