const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonSchema = new Schema({
    language:{
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    Chapter:{
        type: String,
        required: true
    },
    heading:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    filePath:{
        type: String,
        required: false
    },
    likeCount:{
        type: Number,
        default: 0
    },
    likeArray: {
        type: [],
        default: []
    },
    creatorFirstName:{
        type: String,
        required: true
    },
    creatorLastName:{
        type: String,
        required: true
    },
    creatorID:{
        type: String,
        required: true
    },
    creatorEmail:{
        type: String,
        required: true
    },
    creatorImgUrl: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

})

module.exports = mongoose.model('Lesson', lessonSchema)