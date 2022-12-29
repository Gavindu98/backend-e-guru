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


router.route('/lesson-create').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR, USER_ROLES.ADMIN), fileUploader.single('lessonbanner'), lessonCreateHandler)
router.route('/lesson-all-view').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR, USER_ROLES.ADMIN, USER_ROLES.STUDENT), lessonAllViewHandler)
router.route('/lesson-delete').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR, USER_ROLES.ADMIN),lessonDeleteHandler)
router.route('/lesson-like/:lessonID/action-owner/:userID/state/:booleanState').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR, USER_ROLES.STUDENT, USER_ROLES.ADMIN), lessonLikeHandler)
router.route('/lesson-single-view/:lessonID').get(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR, USER_ROLES.STUDENT, USER_ROLES.ADMIN), lessonSingleViewHandler)

module.exports = router