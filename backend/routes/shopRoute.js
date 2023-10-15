const express = require('express')
const { createShop, getMyShop, shopNameValidate } = require('../controller/shopController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const router = express.Router()

router.route('/createshop').post( isAuthenticated,  createShop)
router.route('/validateShopName').post( shopNameValidate)
router.route('/myshop').get(isAuthenticated , getMyShop)


module.exports = router