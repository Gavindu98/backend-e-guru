const Comment = require('../../models/commentModel')
const Post = require('../../models/postModel')

const commentAllViewHandler = async (req, res) => {
    const { postID } = req.body
    if (!postID) return res.status(400).json({ success: false, message: 'Bad request body' })

    try {
        const post = await Post.findById(postID)
        if (!post) return res.status(404).json({ succes: false, message: 'Post not found' })
        const allComments = await Comment.find({ postID: postID })
        console.log("get Comment Arr=", allComments)
        // const finalCommentList = (list) => {
        const commentArray = allComments?.map((data) => {
            return {
                createdAt: data.createdAt,
                postID: data.postID,
                _id: data._id,
                firstName: data.creator.firstName,
                lastName: data.creator.lastName,
                comment: data.commentContent,
                userId: data.creator.id,
                postID: data.postID,
                creatorImgUrl:data.creatorImgUrl,
                role:data.role
            };
        });
        return res.status(200).json({ commentArray })
        //};
        // console.log("finalCommentList=>", tempArr)
        // return res.status(200).json({ allComments })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = commentAllViewHandler