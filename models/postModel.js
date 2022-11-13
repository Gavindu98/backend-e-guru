const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Post', postSchema)