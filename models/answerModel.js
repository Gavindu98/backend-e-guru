const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    quectionId: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    creator: {
        email: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
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

module.exports = mongoose.model('Answer', answerSchema)