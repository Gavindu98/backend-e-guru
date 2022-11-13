const verifyRoles = (...allowedRoles) => { // when passing much argument at onece - spread operator
    return (req, res, next) => {
        const creatorRole = res.locals.role
        // console.log(creatorRole);
        if(!creatorRole) return res.status(401).json({success: true, message: 'Can not find any user role'})
        const rolesArray = [...allowedRoles]
        console.log(rolesArray);
        const result = creatorRole.map(role => rolesArray.includes(role)).find(val => val === true)
        // console.log(result);
        if(!result) return res.status(401).json({success: false, message: `User with email ${req.email} is not allowed for this route.`})
        next()
    }
}

module.exports = verifyRoles