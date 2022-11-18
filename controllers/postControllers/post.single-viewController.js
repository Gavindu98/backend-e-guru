const Post = require('../../models/postModel')

const postSingleViewHandler = async (req, res) => {
    const { postID } = req.params
    // console.log(postID);
    if(!postID) return res.status(400).json({success:false, message: 'No postID received'})

    try {
        const post = await Post.findById(postID)
        if(!post) return res.status(404).json({success:false, message:`No post has find under given postID`})
        return res.status(200).json({success:true, message:'Post find successfully', post:post})
    } catch (error) {
        res.status(500).json({success:false, message:message.error})
    }
}

module.exports = postSingleViewHandler