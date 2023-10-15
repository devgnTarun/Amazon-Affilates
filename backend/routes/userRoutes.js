const express = require('express');
const { registerUser, verifyToken, loginUser, loadUser } = require('../controller/userController');
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated');
const User = require('../models/userSchema');

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/loadUser').get( isAuthenticated,  loadUser)
router.route('/users/:id/verify/:token').get(verifyToken)


router.route('/getUsers').get(async ( req, res) => {
    const user = await User.find()

    res.status(200).json({user})
})



module.exports = router;