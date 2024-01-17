const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ngz01t4r-8000.asse.devtunnels.ms/',
      // target : 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};