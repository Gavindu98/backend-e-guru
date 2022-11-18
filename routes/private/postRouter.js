const express = require('express')
const router = express.Router()
const postCreateHandler = require('../../controllers/postControllers/post.createController')
const postUpdateHandler = require('../../controllers/postControllers/post.updateController')
const postAllViewHandler = require('../../controllers/postControllers/post.all-viewController')
const postSingleViewHandler = require('../../controllers/postControllers/post.single-viewController')
const postLikeHandler = require('../../controllers/postControllers/post.likeController')
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
router.route('/post-all-view').get(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR), postAllViewHandler)
router.route('/post-single-view/:postID').get(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR, USER_ROLES.STUDENT), postSingleViewHandler)
router.route('/post-like/:postID/action-owner/:userID/state/:booleanState').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR,USER_ROLES.STUDENT), postLikeHandler)


module.exports = router