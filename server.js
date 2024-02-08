const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")

// 配置运行端口
const port = process.env.PORT || 3000
// 判断是否为开发环境
const dev = process.env.NODE_ENV !== 'production'
// 初始化 app
const app = next({ dev })
const handle = app.getRequestHandler()

// 代理配置表，这里和一般的 webpack 配置是一样的。
const proxyTable = {
  '/api': {
    target: 'https://ming-dev.zeabur.app',
    pathRewrite: {
      '^/api': '/api'
    },
    changeOrigin: true
  }
}

app.prepare().then(() => {
  const server = express()

  // 如果是开发环境，则代理接口
  // if (dev) {
  //   console.log("using proxy");
  //   server.use('/api', createProxyMiddleware(proxyTable['/api']));
  // }else{
  //   console.log("not using proxy");
  // }

  // 托管所有请求
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
    console.log('Error:::::', err)
})