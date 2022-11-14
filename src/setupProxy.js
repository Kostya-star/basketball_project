// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use(createProxyMiddleware('/Team/GetTeams',
    {
      target: 'http://dev.trainee.dex-it.ru/api',
      changeOrigin: true
    }))
  app.use(createProxyMiddleware('Image/SaveImage',
    {
      target: 'http://dev.trainee.dex-it.ru/api',
      changeOrigin: true
    }))
    // app.use .....
}