const User = require('../../models/userModel')
const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose')

const registrationHandler = async (req, res) => {
    const { firstname, lastname, email, pwd } = req.body
    let role = req.body.role
    // check request's body context as per the requirement
    if (!firstname || !lastname || !email || !pwd || !role) {
        return res.status(400).json({'message': 'Required body context is not available in the request body'})
    }
    // check duplication
    const duplication = await User.findOne({ email }) 
    if(duplication) return res.status(409).json({'message': `This email ${email} has been already registered`})

    let roleToInt = parseInt(role)
    console.log(roleToInt);

    // role seperation/assigning
    switch (roleToInt) {
        case 1:
            role = 'Student'
            break;
        case 2: 
            role = 'Tutor'
            break;
        case 3: 
            role = 'Admin'
            break;
        default:
            role = 'Student'
    }

    // pwd and email valiation
    
    
    try {
        // pwd encryption
        const hashedPassword = await bcrypt.hash(pwd,10)
        console.log(hashedPassword);

        // create and save user in DB
        const newUser  = await User.create({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": hashedPassword,
            "role": role
        })
        console.log(newUser);
        res.status(201).json({'message': `New user ${firstname} ${lastname} is successfully created!`})
    } catch (error) {
        res.status(500).json({'message': error.message})
    }

}

module.exports = registrationHandler