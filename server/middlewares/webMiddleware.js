/**
 * 网站全局中间件 (所有的路由都需要先调用此中间件)
 *
 * 主要处理简单全局相关逻辑
 */
module.exports = function (req, res, next) {
  if (process.env.DEBUG === 'true') console.log('\x1b[43;30m 调用了webMiddleware 中间件  \x1b[43;32m%s  \x1b[43;34m%s  \x1b[43;30m%o\x1b[0m', req.customersIp, req.originalUrl, req.params)
  // 处理PC端跳转：如果是PC端重定向到 www 站 或者移动端重定向到 m 站
  if (!req.isMobile && req.originalUrl.indexOf('/amp/') == -1) {
    var host = process.env.DESKTOP_HOST || 'www.baidu.com'
    var fullUrl = req.urlProtocol + '://' + host + req.originalUrl
    res.redirect(fullUrl)
    return
  }
  next()
}
