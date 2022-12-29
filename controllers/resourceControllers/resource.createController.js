const Resource = require('../../models/resourceModel')
const User = require('../../models/userModel')
const uploadImage = require('../../config/cloudnaryConfig')
const path = require('path')
const { join } = require('path')

// resource file uploading is mandatory
const resourceCreateHandler = async (req, res) => {
    const { data } = req.body
    if(!data) return res.status(400).json({success:true, message:'Body is required'})
    const obj = JSON.parse(data)
    const creatorMail = res.locals.mail
    // res.status(200).json({success:true})
    if(!obj.language || !obj.bookType || !obj.title || !obj.description ) return res.status(400).json({success:false, message:'Some key value pairs are missed'})
    if(!req.file) {
        return res.status(400).json({success:true, message:'File is required'})
    }

    try {
        const resourceCreator = await User.findOne({email:creatorMail})
        const localPath = req.file.path
            const imageUrl = await uploadImage(localPath)
            // const localStoreDestination = path.join(__dirname, '../', '../', `/storage/images/${filename}`)
            const newResource = await Resource.create({
                'language': obj.language,
                'bookType': obj.bookType,
                'title': obj.title,
                'description': obj.description,
                'filePath': imageUrl,
                'creatorFirstName': resourceCreator.firstname,
                'creatorLastName': resourceCreator.lastname,
                'creatorEmail': resourceCreator.email,
                'creatorID': resourceCreator.id,
                "creatorImgUrl": resourceCreator.url
            })
            return res.status(201).json({success:true, message:'Resource has been created', newResource })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = resourceCreateHandler