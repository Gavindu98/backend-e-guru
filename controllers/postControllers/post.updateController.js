const Post = require('../../models/postModel')
const path = require('path')
const { fileOpt} = require('./post.deleteController')

const postUpdateHandler = async (req, res) => {
    const {titleUpdated, descriptionUpdated, postID} = req.body
    const authorizedEmail = res.locals.mail
    // const { filename } = req.file
    console.log(authorizedEmail);
    if (!postID) return res.status(400).json({success:false, message:'PostID is not provided'})
    if(!titleUpdated || !descriptionUpdated ) return res.status(400).json({success:false, message:'req.body err'})
    
    // extract post details 
    try {
        const post = await Post.findById(postID)
        const pathLocation = post.filePath
        // console.log(post.creator);
        if(post.creator.email != authorizedEmail) return res.status(401).json({success:false, message:'Unauthorized try'})
        if (!req.file) {
            post.title = titleUpdated
            post.description = descriptionUpdated
            await post.save()
        } else {
            const { filename } = req.file
            const localStoreDestination = path.join(__dirname, '..', '..', `storage/images/${filename}`) 
            post.title = titleUpdated
            post.description = descriptionUpdated
            post.filePath = localStoreDestination
            await post.save()
            // deletion of previous file    
            fileOpt(pathLocation)
        }
        return res.status(200).json({success:true, message:'Post successfully updated', updatedPost:post})
         

    } catch (error) {
        res.status(409).json({success:false, message:'Post update is failed'})
    }
    
    
}


module.exports = postUpdateHandler
