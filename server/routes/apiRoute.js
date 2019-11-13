const express = require('express')
const apiController = require('../controllers/apiController')

var router = express.Router()

router.get('/tikTok/HotTag', apiController.tikTokHotTag)

router.get('/tikTok/HotTag/Content', apiController.tikTokHotTagContent)

module.exports = router