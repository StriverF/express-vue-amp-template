const express = require('express')
const apiController = require('../controllers/apiController')

var router = express.Router()

router.get('/product/', apiController.product)

module.exports = router