const express = require('express')
const router = express.Router()
const verifyAccessToken = require('../../middleware/verifyJWT')
const verifyRoles = require('../../middleware/verifyRole')
const USER_ROLES = require('../../config/userRoles')
const fileUploader = require('../../middleware/fileUploader')
const lessonCreateHandler = require('../../controllers/lessonController/lesson.createController')
const lessonAllViewHandler = require('../../controllers/lessonController/lesson.all-viewController')
const lessonLikeHandler = require('../../controllers/lessonController/lesson.likeController')
const lessonSingleViewHandler = require('../../controllers/lessonController/lesson.single-viewController')
const lessonDeleteHandler = require('../../controllers/lessonController/lesson.deleteController')


router.route('/lesson-create').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR), fileUploader.single('lessonbanner'), lessonCreateHandler)
router.route('/lesson-all-view').get(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR),lessonAllViewHandler)
router.route('/lesson-delete').post(lessonDeleteHandler)
router.route('/lesson-like/:lessonID/action-owner/:userID/state/:booleanState').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR, USER_ROLES.STUDENT), lessonLikeHandler)
router.route('/lesson-single-view/:lessonID').get(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR, USER_ROLES.STUDENT), lessonSingleViewHandler)

module.exports = router