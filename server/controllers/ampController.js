

/**
 * AMP 产品详情页面
 */
module.exports.ampPets = function (req, res) {
  if (process.env.DEBUG === 'true') console.log('\x1b[45;37m 调用了ampController.ampPlayground 控制器  \x1b[45;34m%s  \x1b[45;33m%o\x1b[0m', req.originalUrl, req.params)
  res.render('pets', {})
}
