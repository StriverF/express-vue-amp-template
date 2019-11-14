const express = require('express')
const vueController = require('../controllers/vueController')
const vueMiddleware = require('../middlewares/vueMiddleware')

var router = express.Router()

// 使用Vue路由初始化中间件
router.use(vueMiddleware)

router.get('/:lang([a-z]{2,2})?/', vueController.homePage)

router.get('/:lang([a-z]{2,2})?/subsite/home', vueController.subsiteHomePage)


// router.get('/:lang([a-z]{2,2})?/*', vueController.commonPage)

module.exports = router
