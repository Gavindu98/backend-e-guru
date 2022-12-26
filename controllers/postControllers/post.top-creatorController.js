const Post = require('../../models/postModel')
const User = require('../../models/userModel')

const topCreatorHandler = async (req, res) => {
    try {
        const allPosts = await Post.find()
        res.status(200)
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}

module.exports = topCreatorHandler