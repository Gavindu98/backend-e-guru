const Comment = require('../../models/commentModel')
const User = require('../../models/userModel')

const commentCreateHandler = async (req, res) => {
    const {postID, userID, comment} = req.body
    if(!postID || !userID || !comment) return res.status(400).json({success:false, message: 'Error'})
    
    try {
        const user = await User.findById(userID)
        const newComment = await Comment.create({
            "postID": postID,
            "creator" : {
                "id": userID,
                "firstName": user.firstname,
                "lastName": user.lastname
            },
            "commentContent": comment
        })
        return res.status(201).json({success:true, message:'Successfully commented', newComment})
    } catch (error) {
        return res.status(500).json({success:false, message: error.message})
    }
}

module.exports = commentCreateHandler