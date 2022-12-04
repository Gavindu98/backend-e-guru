const Resource = require('../../models/resourceModel')

const resourceAllViewHandler = async (req, res) => {
    const { booktype } = req.body
    // console.log(subject[0]);
    // res.status(200).json({success:true})
    try {
        if(!booktype){ 
            const resource = await Resource.find()
            return res.status(200).json({success:true, resource})
        }
        if(booktype[0] && booktype[1]){
            const resource0 = await Resource.find({bookType:booktype[0]})
            const resource1 = await Resource.find({bookType:booktype[1]})
            resource3 = resource0.concat(resource1)
            return res.status(200).json({success:true, resource3})
        }
        if(booktype[0]){
            const resource0 = await Resource.find({bookType:booktype[0]})
            return res.status(200).json({success:true, resource0})
        }
        
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = resourceAllViewHandler