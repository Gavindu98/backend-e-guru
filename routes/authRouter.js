const express =require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const {pwdValidation} = require('../middleware/bodyValidation')
const registerHandler  = require('../controllers/authControllers/registerController')
const loginHandler  = require('../controllers/authControllers/loginController')


//comment
router.route('/register').post(pwdValidation,registerHandler)
router.route('/login').post(loginHandler)

module.exports = router
