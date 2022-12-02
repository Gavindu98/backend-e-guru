const Lesson = require('../../models/lessonModel')

const lessonSingleViewHandler = async (req, res) => {
    const { lessonID } = req.params
    try {
        const singleLesson = await Lesson.findById(lessonID)
        if(!singleLesson) return res.status(404).json({success:true, message:'Lesson was not found'})
        return res.status(200).json({success: true, singleLesson})
    } catch (error) {
        res.status(500).json({success:false, message:message.error})
    }
}

module.exports = lessonSingleViewHandler