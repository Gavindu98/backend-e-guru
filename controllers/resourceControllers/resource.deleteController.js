const Resource = require('../../models/resourceModel')
const fsPromises = require('fs').promises
const path = require('path')
const fileOpt = async (location) => {
    try {
        await fsPromises.rm(location)
    } catch (error) {
        console.log(error);
    }
}

const resourceDeleteHandler = async (req,res) => {
    const authorizedUser = res.locals.mail
    const { resourceID } = req.body
    if(!resourceID) return res.status(400).json({success:true, message: 'No resourceID provided'})
    try {
        const resource = await Resource.findById(resourceID)
        if (!resource) return res.status(404).json({ success: true, message: 'Resource is not found' })
        const pathLocation = resource.filePath
        if (resource.creatorEmail != authorizedUser) return res.status(401).json({ success: true, message: 'Unauthorized try' })
        // deletion of document
        await Resource.deleteOne({ _id: resourceID })
        fileOpt(pathLocation)
        return res.status(200).json({ success: true, message: 'Resource successfully deleted' })
        
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}

module.exports = resourceDeleteHandler