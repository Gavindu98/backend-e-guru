const Lesson = require('../../models/lessonModel')

const lessonAllViewHandler = async (req, res) => {
    const { language, grade, chapter, subject } = req.body
    try {
        if(!language && !grade && !chapter && !subject) {
            const lessonArray = await Lesson.find()
            return res.status(200).json({success: true, lessonArray})
        }else if(!language && !grade && !chapter && subject){
            const lessonArray = await Lesson.find({subject:subject})
            return res.status(200).json({success: true, lessonArray})
        }else if(!language && !grade && chapter && subject){
            const lessonArray = await Lesson.find({chapter:chapter})
            return res.status(200).json({success: true, lessonArray})
        }
        
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
 }

 module.exports = lessonAllViewHandler