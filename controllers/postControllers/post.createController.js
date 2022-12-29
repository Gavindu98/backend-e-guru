const Post = require('../../models/postModel')
const User = require('../../models/userModel')
const uploadImage = require('../../config/cloudnaryConfig')


const path = require('path')

const postCreateHandler = async (req, res) => {
    const { title, description } = req.body
    if (!title || !description) return res.status(400).json({ success: false, message: 'missing body value' })

    // extract creator details 
    const creatorMail = res.locals.mail // passing data from one to next middleware
    if (!creatorMail) return res.status(410)

    // extract file details
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'File is needed' })
    }
    // console.log(req.file);
    const localPath = req.file.path
    // console.log(filename);
    // const localStoreDestination = path.join(process.env.VIKUM_DIR, `storage/images/${filename}`, )
    // const localStoreDestination = path.join(__dirname, '../','../',`/storage/images/${filename}`)
    // console.log(localStoreDestination);
    // return res.status(200).json({success: true})
    try {
        const imageUrl = await uploadImage(localPath)
        console.log('image url',imageUrl);
        const user = await User.findOne({ email: creatorMail })
        console.log('user',user);
        // save post to db
        const newPost = await Post.create({
            "title": title,
            "description": description,
            "creatorFirstName": user.firstname,
            "creatorLastName": user.lastname,
            "creatorEmail": creatorMail,
            "creatorID": user._id,
            "creatorImgUrl": user.url,
            "filePath": imageUrl
        })

        // const post = await Post.findById(newPost._id)
        
        // console.log(user.firstname);
        console.log('new ', newPost);
        res.status(201).json({
            success: true,
            message: 'Post has been created',
            post: newPost,
            // path: path,
            // localStoreDestination: localStoreDestination
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Post creation is failed' })
    }
}


module.exports = postCreateHandler