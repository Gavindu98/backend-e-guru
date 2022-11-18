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
        email:{
            type:String,
            required: true
        },
        firstname:{
            type:String,
            required: true
        },
        lastname:{
            type:String,
            required: true
        }
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
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Post', postSchema)