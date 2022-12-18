const Lesson = require('../../models/lessonModel')

const lessonAllViewHandler = async (req, res) => {
    const { language, grade, subject } = req.body
    try {
        if(!language && !grade && !subject) {
            const lessonArray = await Lesson.find()
            return res.status(200).json({success: true, lessonArray})
        }else if(!language && !grade && subject){
            const lessonArray = await Lesson.find({subject:subject})
            return res.status(200).json({success: true, lessonArray})
        }else if(!language && grade && !subject){
            const lessonArray = await Lesson.find({grade:grade})
            return res.status(200).json({success: true, lessonArray})
        }else if(language && !grade && !subject){
            const lessonArray = await Lesson.find({language:language})
            return res.status(200).json({success: true, lessonArray})
        // complex searching
        }else if(language && grade && !subject){
            const lessonArray = await Lesson.find({$and:[{language:language},{grade:grade}]})
            return res.status(200).json({success: true, lessonArray})

        }else if(language && !grade && subject){
            const lessonArray = await Lesson.find({$and:[{language:language},{subject:subject}]})
            return res.status(200).json({success: true, lessonArray})

        }else if(!language && grade && subject){
            const lessonArray = await Lesson.find({$and:[{grade:grade},{subject:subject}]})
            return res.status(200).json({success: true, lessonArray})

        }
        
    } catch (error) {
        res.status(500).json({ssuccess:false, mesage: error.message})
    }
 }

 module.exports = lessonAllViewHandler