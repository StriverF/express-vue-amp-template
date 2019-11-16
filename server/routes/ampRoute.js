
const express = require('express')
const infoMiddleware = require('../middlewares/infoMiddleware')
const webMiddleware = require('../middlewares/webMiddleware')
const apmMiddleware = require('../middlewares/ampMiddleware')
const ampController = require('../controllers/ampController')

var router = express.Router()

// req基本信息扩展中间件
router.use(infoMiddleware)
// 使用网站全局中间件
router.use(webMiddleware)
// 初始化amp路由相关设置中间件
router.use(apmMiddleware)

router.get('/:lang([a-z]{2,2})?/amp/pets', ampController.ampPets)

module.exports = router
