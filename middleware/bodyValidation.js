const { body, check } = require('express-validator')

const pwdValidation = (req, res, next) => {
    if(!body(req.body.pwd).isLength({ min:8 })){
        return res.status(400).json({ "message": 'Length should be more than 8 chars' })
    }

    // need regx for validation password field
        
    console.log('Moved onto register controller');
    next()
}

module.exports = {
    pwdValidation
}