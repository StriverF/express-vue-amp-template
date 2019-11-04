const fs = require('fs')
/**
 * 重新初始化Vue路由的相关设置
 */
module.exports = function (req, res, next) {
  if (process.env.DEBUG === 'true') console.log('\x1b[43;30m 调用了vueMiddleware 中间件 \x1b[43;34m%s  \x1b[43;30m%o\x1b[0m', req.originalUrl, req.params)
  req.app.engine('html', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
      if (err) return callback(err)
      var rendered = content
        .toString()
        .replace('##meta##', options.meta)
        .replace('##ampLink##', options.ampLink || '')
        .replace('"##apiJonsContent##"', options.apiJonsContent)
      return callback(null, rendered)
    })
  })
  req.app.set('views', './public')
  req.app.set('view engine', 'html')
  next()
}
