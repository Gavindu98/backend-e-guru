const jwt = require('jsonwebtoken')

const verifyAccessToken = (req, res, next) => {
    // const {title, description } = req.body
    // console.log(title);
    const authHeader = req.headers.authorization || req.headers['authorization']
    if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({success: false, message: 'Unauthorized'})
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403)
            // req.mail = decoded.email
            res.locals.role = decoded.role
            res.locals.mail = decoded.email
            next()
        }
        
    )
}

module.exports = verifyAccessToken