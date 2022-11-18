const Post = require('../../models/postModel')
const User = require('../../models/userModel')

const postAllViewHandler = async (req, res) => {
    const userEmail = res.locals.mail
    if(!userEmail) return res.status(400).json({success:false, message:'user not found'})

    try {
        const posts = await Post.find()
        const user = await User.find({email:userEmail})
        // console.log(posts);
        res.status(200).json({success:true, message:'All posts are received', posts:posts, firstName:user.firstname, lastName:user.lastname }) 
    } catch (error) {
        res.status(400).json({success:false, message:'All post loading err'})
    }

}

module.exports = postAllViewHandler