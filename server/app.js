const express = require('express')
const app = express()
const fs = require('fs')
const dotenv = require('dotenv')
const result = dotenv.config()
const timeout = require('connect-timeout')
const apiRouter = require('./routes/apiRoute')
const ampRouter = require('./routes/ampRoute')
const vueRouter = require('./routes/vueRoute')

if (result.error) {
  throw result.error
}

const port = process.env.SERVER_PORT
if (process.env.DEBUG === 'true') console.log(`Your port is ${process.env.SERVER_PORT}`)

// 设置服务端请求超时时间
if (process.env.DEBUG !== 'true') {
  app.use(timeout('60s'))
}

// 映射静态资源目录
app.use('/', express.static('public/'))

// 按照顺序使用路由
app.use(apiRouter)
app.use(ampRouter)
app.use(vueRouter)

// 监听服务异常
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, _next) {
  console.error(err.stack)
  // res.status(500).send('Something broke!')
  res.redirect('/404')
})

// 配置DEBUG环境 https证书
if (process.env.DEBUG === 'true' && process.env.SERVER_PROTOCOL === 'https') {
  var privateKey = fs.readFileSync(`./cert/${process.env.PRIVATE_KEY_NAME}`, 'utf8')
  var certificate = fs.readFileSync(`./cert/${process.env.CERTIFICATE_NAME}`, 'utf8')
  var credentials = { key: privateKey, cert: certificate }
  require('https').createServer(credentials, app).listen(port)
  console.info(`服务启动成功:https://localhost:${port}`)
} else {
  app.listen(port)
  console.info(`服务启动成功:http://localhost:${port}`)
}
