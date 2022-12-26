const Post = require('../../models/postModel')
const User = require('../../models/userModel')

const { google } = require('googleapis')
const path = require('path')

const postCreateHandler = async (req, res) => {
    const {title, description } = req.body
    if(!title || !description ) return res.status(400).json({success: false, message: 'missing body value'})

    // extract creator details 
    const creatorMail = res.locals.mail // passing data from one to next middleware
    if(!creatorMail) return res.status(410)

    // extract file details
    if(!req.file) return res.status(400)
    const { filename } = req.file
    // console.log(filename);
    // const localStoreDestination = path.join(process.env.VIKUM_DIR, `storage/images/${filename}`, )
    const localStoreDestination = `${process.env.VIKUM_DIR}/storage/images/${filename}`
    // console.log(localStoreDestination);
    // return res.status(200).json({success: true})
    try {
        const user = await User.findOne({email:creatorMail})
        // save post to db
        const newPost = await Post.create({
            "title": title,
            "description": description,
            "creator": {
                "email": creatorMail,
                "firstname": user.firstname,
                "lastname": user.lastname
            },
            "filePath": localStoreDestination
        })

        const post = await Post.findById(newPost._id)
        
        // console.log(user.firstname);
        // console.log(newPost);
        res.status(201).json({
            success:true, 
            message: 'Post has been created',
            post : post
        })
    } catch (error) {
        res.status(401).json({success:false, message: 'Post creation is failed'})
    }
}


module.exports = postCreateHandler