const express = require('express');
const { createPost, getAllPost, getUserPosts, clickCount, mostClicked } = require('../controller/postController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { authorizedRoles } = require('../middlewares/authorizedRoles');
const router = express.Router()

router.route('/createPost').post( isAuthenticated , authorizedRoles('seller' , 'admin') ,createPost)
router.route('/getAllPosts').get( getAllPost)
router.route('/getMyPosts').get( isAuthenticated,  authorizedRoles('seller' , 'admin'),  getUserPosts)
router.route('/click/:id').get(clickCount) // Working
router.route('/mostVisited').get(mostClicked) // Working

module.exports = router;