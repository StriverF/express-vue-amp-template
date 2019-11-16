/**
 * 初始化AMP路由的相关设置
 */
module.exports = function (req, res, next) {
  if (process.env.DEBUG === 'true') console.log('\x1b[43;30m 调用了ampMiddleware 中间件 \x1b[43;34m%s  \x1b[43;30m%o\x1b[0m', req.originalUrl, req.params)
  req.app.set('views', './amp/views')
  req.app.set('view engine', 'ejs')
  next()
}
