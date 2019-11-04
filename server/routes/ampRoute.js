
const express = require('express')
const infoMiddleware = require('../middlewares/infoMiddleware')
const webMiddleware = require('../middlewares/webMiddleware')
const ampController = require('../controllers/ampController')

var router = express.Router()

// req基本信息扩展中间件
router.use(infoMiddleware)
// 使用网站全局中间件
router.use(webMiddleware)

router.get('/amp/product/:productName', ampController.productDetail)

module.exports = router