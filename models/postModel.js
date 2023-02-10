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
        required: false
    },
    role: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    likeArray:{
        type:[],
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentArray:{
        type:[],
        default: []
    },
    commentCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Post', postSchema)