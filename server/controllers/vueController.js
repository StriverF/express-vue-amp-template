const homePageServer = require('../api/servers/homePageServer')



/**
 * 首页路由控制器
 */
module.exports.homePage = function (req, res) {
  if (process.env.DEBUG === 'true') console.log('\x1b[45;37m 调用了AppController.homePage 控制器  \x1b[45;34m%s  \x1b[45;33m%o\x1b[0m', req.originalUrl, req.params)
  homePageServer.getTikTokHotTagData((renderData, error) => {
    if (error) {
      console.error(error.message)
      res.redirect('/404')
    } else {
      res.render('mainSite/index', renderData)
    }
  })
}
