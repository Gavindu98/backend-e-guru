const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    postID:{
        type: String,
        required: true
    },
    creator: {
        id: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        required: true
    },
    creatorImgUrl: {
        type: String,
        required: true
    },
    commentContent: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Comment', commentSchema)