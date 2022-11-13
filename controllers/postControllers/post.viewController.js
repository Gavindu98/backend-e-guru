const Post = require('../../models/postModel')

const postViewHandler = async (req, res) => {
    const userEmail = res.locals.mail
    if(!userEmail) return res.status(400).json({success:false, message:'user not found'})

    try {
        const posts = await Post.find({creator:userEmail})
        // console.log(posts);
        res.status(200).json({success:true, message:'All posts are received', posts:posts}) 
    } catch (error) {
        res.status(400).json({success:false, message:'All post loading err'})
    }

}

module.exports = postViewHandler