const express = require('express')
const router = express.Router()
const verifyAccessToken = require('../../middleware/verifyJWT')
const verifyRoles = require('../../middleware/verifyRole')
const USER_ROLES = require('../../config/userRoles')
const fileUploader = require('../../middleware/fileUploader')

const resourceCreateHandler = require('../../controllers/resourceControllers/resource.createController')
const resourceDeleteHandler = require('../../controllers/resourceControllers/resource.deleteController')
const resourceSingleViewHandler = require('../../controllers/resourceControllers/resource.single-viewController')


router.route('/resource-create').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR), fileUploader.single('file'), resourceCreateHandler)
router.route('/resource-delete').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR), resourceDeleteHandler)
router.route('/resource-single-view/:resourceID').post(verifyAccessToken, verifyRoles(USER_ROLES.TUTOR, USER_ROLES.STUDENT), resourceSingleViewHandler)



module.exports = router