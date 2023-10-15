const express = require('express');
const { checkout, payementVerification } = require('../controller/payementController');
const router = express.Router()

router.route('/checkout' ).post(checkout)
router.route('/payementverification').post(payementVerification)



module.exports = router;