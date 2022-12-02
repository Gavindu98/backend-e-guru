const Lesson = require('../../models/lessonModel')
const User = require('../../models/userModel')

const arrayCheck = (array, id) => {
    const checkResult = array.includes(id)
    return checkResult
}

const lessonLikeHandler = async (req, res) => {
    const {lessonID, userID, booleanState} = req.params
    const { mail } = res.locals
    try {
        const user = await User.findOne({email:mail})
        if(userID !== user.id) return res.status(401).json({success:true , message: 'Unauthorized user'})

        const lesson = await Lesson.findById(lessonID)
        if(!lesson) return res.status(404).json({success:true, message: 'Lesson is not found'})

        if(booleanState === 'true'){
            if (lesson.likeArray.length == 0) {
                lesson.likeArray.push(userID)
                lesson.likeCount = lesson.likeArray.length
                await lesson.save()
                return res.status(200).json({success:true, message:'First like'})
            }
        }else{
            if (lesson.likeArray.length == 0) {
                return res.status(409).json({success:true, message:'No At least one like'})
            }
        }
        // not first time like
        if (booleanState==="true" && arrayCheck(lesson.likeArray, userID)) {
            return res.status(409).json({success:true, message:'Already liked'})
                
        }else if(booleanState==="true" && !arrayCheck(lesson.likeArray, userID)){
            lesson.likeArray.push(userID)
            lesson.likeCount = lesson.likeArray.length
            await lesson.save()
            return res.status(200).json({success:true, message:'LIKED'})    

        }else if(booleanState==="false" && arrayCheck(lesson.likeArray, userID)){
            const newLikeArray = lesson.likeArray.filter(val => val !== userID)
            lesson.likeArray = newLikeArray
            lesson.likeCount = lesson.likeArray.length
            await lesson.save()
            return res.status(200).json({success:true, message:'UNLIKED'})
        }else{
            return res.status(409).json({success:true, message:'Not liked yet'})
        }
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}

module.exports = lessonLikeHandler