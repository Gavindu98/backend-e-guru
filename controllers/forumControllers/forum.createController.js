const Forum = require('../../models/forumModel')
const User = require('../../models/userModel')

const { google } = require('googleapis')
const path = require('path')

const forumCreateHandler = async (req, res) => {
    //console.log("forum data", req.body)
    const { userId, quection } = req.body
    if (!userId || !quection) return res.status(400).json({ success: false, message: 'missing body value' })

    // extract creator details 
    const creatorMail = res.locals.mail // passing data from one to next middleware
    if (!creatorMail) return res.status(410)

    // extract file details
    // const { filename } = req.file
    // if(!filename) return res.status(410)
    // console.log(filename);
    // const localStoreDestination = path.join(process.env.VIKUM_DIR, `storage/images/${filename}`, )
    // const localStoreDestination = `${process.env.VIKUM_DIR}/storage/images/${filename}`
    // console.log(localStoreDestination);
    // return res.status(200).json({success: true})
    try {
        const user = await User.findOne({ email: creatorMail })
        // save post to db
        const newForum = await Forum.create({
            "userId": userId,
            "quection": quection,
            "creator": {
                "email": creatorMail,
                "firstname": user.firstname,
                "lastname": user.lastname
            },
            "creatorImgUrl": user?.url? user.url: null,
            "role":user.role
        })

        const forum = await Forum.findById(newForum._id)

        // console.log(user.firstname);
        // console.log(newPost);
        res.status(201).json({
            success: true,
            message: 'forum has been created',
            forum: forum
        })
    } catch (error) {
        res.status(401).json({ success: false, message: 'forum creation is failed' })
    }
}


module.exports = forumCreateHandler