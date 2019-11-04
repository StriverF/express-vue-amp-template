const MobileDetect = require('mobile-detect')

/**
 * req 基本属性扩展中间件
 */
module.exports = function (req, res, next) {
  if (process.env.DEBUG === 'true') console.log('\x1b[43;30m 调用了infoMiddleware 中间件 \x1b[43;34m%s  \x1b[43;30m%o\x1b[0m', req.originalUrl, req.params)
  let customersIp = req.headers['x-forwarded-for'] || ''
  customersIp = customersIp.split(',')[0]
  global.customersIp = customersIp
  req.customersIp = customersIp
  let host = req.headers['host'] || process.env.MOBILE_HOST
  req.originadHost = host
  let hostSplitArray = host.split(':')
  req.websiteDomain = hostSplitArray[0]
  req.urlPort = hostSplitArray.length > 1 ? hostSplitArray[1] : ''
  let envProtocol = process.env.SERVER_PROTOCOL ? process.env.SERVER_PROTOCOL : 'http'
  req.urlProtocol = req.headers['x-forwarded-proto'] || envProtocol
  let md = new MobileDetect(req.headers['user-agent'])
  req.equipment = md.mobile()
  if (process.env.DEBUG === 'true') console.log('检查到设备类型：', req.equipment)
  req.isMobile = !!req.equipment
  next()
}
