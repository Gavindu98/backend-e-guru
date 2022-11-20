const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forumSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    quection: {
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
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Forum', forumSchema)