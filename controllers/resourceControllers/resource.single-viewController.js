const Resource = require('../../models/resourceModel')

const resourceSingleViewHandler = async (req, res) => {
    const { resourceID } = req.params
    // console.log(postID);
    if(!resourceID) return res.status(400).json({success:true, message: 'No resourceID received'})

    try {
        const resource = await Resource.findById(resourceID)
        if(!resource) return res.status(404).json({success:true, message:`No resource has find under given resourceID`})
        return res.status(200).json({success:true, message:'Resource find successfully', resource})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

module.exports = resourceSingleViewHandler