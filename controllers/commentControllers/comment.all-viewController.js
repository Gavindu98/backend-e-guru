const Comment = require('../../models/commentModel')
const Post = require('../../models/postModel')

const commentAllViewHandler = async (req, res) => {
    const {postID} = req.body
    if(!postID) return res.status(400).json({success:false, message:'Bad request body'})

    try {
        const post = await Post.findById(postID)
        if(!post) return res.status(404).json({succes:false, message: 'Post not found'})
        const allComments = await Comment.find({postID:postID})
        return res.status(200).json({success:true, message: 'Retrived all comments', comments:allComments})
    } catch (error) {
        return res.status(500).json({success:false, message: error.message})
    }
}

module.exports = commentAllViewHandler