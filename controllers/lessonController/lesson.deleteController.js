const Lesson = require('../../models/lessonModel')
const fsPromises = require('fs').promises
const path = require('path')
// file deletion function
const fileOpt = async (location) => {
    try {
        await fsPromises.rm(location)
    } catch (error) {
        console.log(error);
    }
}

const lessonDeleteHandler = async (req, res) => {
    // res.status(200).json({success: true})
    const { lessonID } = req.body
    if(!lessonID) return res.status(400).json({success:true, message: 'No lessonID provided'})
    try {
        const lesson = await Lesson.findById(lessonID)
        const pathLocation = lesson.filePath
        // deletion of document
        await Lesson.deleteOne({ _id: lessonID })
        if (!pathLocation) {
            res.status(200).json({ success: true, message: 'Lesson x successfully deleted' })
        }else{
            fileOpt(pathLocation)
            res.status(200).json({ success: true, message: 'Lesson successfully deleted' })
        }
        
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}

module.exports = lessonDeleteHandler