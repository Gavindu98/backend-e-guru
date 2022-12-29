const express = require('express')
const router = express.Router()
const commentAllViewHandler = require('../../controllers/commentControllers/comment.all-viewController')
const commentCreateHandler = require('../../controllers/commentControllers/comment.createController')
const verifyAccessToken = require('../../middleware/verifyJWT')
const verifyRoles = require('../../middleware/verifyRole')
const USER_ROLES = require('../../config/userRoles')

router.route('/comment-create').post(verifyAccessToken, verifyRoles(USER_ROLES.STUDENT, USER_ROLES.TUTOR, USER_ROLES.ADMIN), commentCreateHandler)
router.route('/comment-all-view').post(verifyAccessToken, verifyRoles(USER_ROLES.STUDENT, USER_ROLES.TUTOR, USER_ROLES.ADMIN), commentAllViewHandler)


module.exports = router