const Post = require('../../models/postModel')
const { google } = require('googleapis')
const path = require('path')

const postCreateHandler = async (req, res) => {
    const {title, description } = req.body
    if(!title || !description ) return res.status(400).json({success: false, message: 'missing body value'})

    // extract creator details 
    const creatorMail = res.locals.mail // passing data from one to next middleware
    if(!creatorMail) return res.status(410)

    // extract file details
    const { filename } = req.file
    if(!filename) return res.status(410)
    // console.log(filename);
    const localStoreDestination = path.join(process.env.VIKUM_DIR, `storage/images/${filename}`, )
    // console.log(dest);
    // return res.status(200).json({success: true})
    try {
        // save post to db
        const newPost = await Post.create({
            "title": title,
            "description": description,
            "creator": creatorMail,
            "filePath": localStoreDestination
        })
        // console.log(newPost);
        res.status(201).json({
            success:true, 
            message: 'Post has been created',
            post : newPost
        })
    } catch (error) {
        res.status(401).json({success:false, message: 'Post creation is failed'})
    }
}


module.exports = postCreateHandler