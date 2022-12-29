const mongoose =require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50  
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50  
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please provide an email address' ],
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    refreshToken: String,
    passwordResetToken: String,
    resetTokenExpired: String


})



module.exports = mongoose.model('User', userSchema)