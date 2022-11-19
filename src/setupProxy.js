// eslint-disable-next-line @typescript-eslint/no-var-requires
import { createProxyMiddleware } from 'http-proxy-middleware';

export default app => {
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
  // app.use(createProxyMiddleware('Auth/SignIn',
  //   {
  //     target: 'http://dev.trainee.dex-it.ru/api',
  //     headers: {
  //       'Access-Control-Allow-Origin': 'http://localhost',
  //       'Access-Control-Allow-Headers': 'Accept',
  //       'Access-Control-Allow-Credentials': true,
  //       credentials: true,
  //     },
  //     changeOrigin: true,
  //   }))
    // app.use .....
}