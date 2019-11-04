
function baseConfiguration (req) {
  req.app.set('views', './amp/views')
  req.app.set('view engine', 'ejs')
}

/**
 * AMP 产品详情页面
 */
module.exports.productDetail = function (req, res) {
  baseConfiguration(req)
  if (process.env.DEBUG === 'true') console.log('\x1b[45;37m 调用了ampController.productDetail 控制器  \x1b[45;34m%s  \x1b[45;33m%o\x1b[0m', req.originalUrl, req.params)
  res.render('product/detail/index', {})
}
