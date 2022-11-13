const express = require('express')
const router = express.Router()
const postCreateHandler = require('../../controllers/postControllers/post.createController')
const postUpdateHandler = require('../../controllers/postControllers/post.updateController')
const postViewHandler = require('../../controllers/postControllers/post.viewController')
const {postDeleteHandler} = require('../../controllers/postControllers/post.deleteController')
const fileUploader = require('../../middleware/fileUploader')
const { postBodyValidation } = require('../../middleware/bodyValidation')
const verifyAccessToken = require('../../middleware/verifyJWT')
const verifyRoles = require('../../middleware/verifyRole')
const USER_ROLES = require('../../config/userRoles')

// tutor's routes
router.route('/post-create').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR), fileUploader.single('file'), postCreateHandler)
router.route('/post-update').put(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR), fileUploader.single('fileUpdate'), postUpdateHandler)
router.route('/post-delete').put(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR), postDeleteHandler)
router.route('/post-all-view').get(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR), postViewHandler)


module.exports = router