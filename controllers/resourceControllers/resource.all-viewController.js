const Resource = require('../../models/resourceModel')

const resourceAllViewHandler = async (req, res) => {
    const { subject } = req.body
    // console.log(subject[0]);
    // res.status(200).json({success:true})
    try {
        if(!subject){ 
            const resource = await Resource.find()
            return res.status(200).json({success:true, resource})
        }
        if(subject[0] && subject[1]){
            const resource0 = await Resource.find({bookType:subject[0]})
            const resource1 = await Resource.find({bookType:subject[1]})
            resource3 = resource0.concat(resource1)
            return res.status(200).json({success:true, resource3})
        }
        if(subject[0]){
            const resource0 = await Resource.find({bookType:subject[0]})
            return res.status(200).json({success:true, resource0})
        }
        
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = resourceAllViewHandler