const User = require('../../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')

const loginHandler = async (req, res) => {
    // check request's body context as per the requirement
    const { email, pwd } = req.body
    if(!email || !pwd) return res.status(400).json({'message': 'Required body context is not available in the request body'})

    // check existancy of user
    const foundUser = await User.findOne({email}).select('+password')
    if(foundUser) {
        try {
            // evaluate password
            const matchPwd = await bcrypt.compare(pwd, foundUser.password)
            if (!matchPwd) return res.status(401).json({ 'message':'Password is mismatched' })

            // create jwt
            const userRole = foundUser.role
                const accessToken = jwt.sign(
                    { 
                        "email": foundUser.email,
                        "role": [
                            userRole
                        ],
                        "userID": foundUser._id
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '5h' }
                )
                const refreshToken = jwt.sign(
                    {
                        "email": email
                    },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: "1day" }
                )
                // save refresh token into the DB
                foundUser.refreshToken = refreshToken
                const result = await foundUser.save()
                res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000  } )
                res.status(200).json({ accessToken, "email": result.email, "id": result._id , "firstname": result.firstname, "lastname": result.lastname, "role": result.role })
        } catch (error) {
            res.status(500).json({success: false, message: error.message}) 
        }

    }else{
        if (!foundUser) return res.status(401).json({ 'message': `No user exist under email ${email}`})
    } 
}

module.exports = loginHandler