const Post = require('../../models/postModel')
const fsPromises = require('fs').promises
const path = require('path')
// file deletion function
const fileOpt = async (location) => {
    try {
        await fsPromises.rm(location)
    } catch (error) {
        console.log(error);
    }
}

const postDeleteHandler = async (req, res) => {
    const { postID } = req.body
    const authorizedEmail = res.locals.mail
    if (!postID) return res.status(400).json({ success: false, message: 'Unable to identify the post to delete' })

    try {
        const post = await Post.findById(postID)
        const pathLocation = post.filePath
        if (!post) return res.status(404).json({ success: false, message: 'Post is not found' })
        if (post.creatorEmail != authorizedEmail) return res.status(401).json({ success: false, message: 'Unauthorized try' })
        // console.log(post);

        // deletion of document
        await Post.deleteOne({ _id: postID })
        fileOpt(pathLocation)
        res.status(200).json({ success: true, message: 'Post successfully deleted' })

    } catch (error) {
        res.status(409).json({ success: false, message: error.message })
    }
}

module.exports = {
    postDeleteHandler,
    fileOpt
}