const Lesson = require('../../models/lessonModel')
const User = require('../../models/userModel')
const path = require('path')
const { join } = require('path')


// lesson banner upload is not mandtory
const lessonCreateHandler = async (req, res) => {
    const { description } = req.body
    if(!description) return res.status(400).json({success:false, message:'Body is required'})
    const obj = JSON.parse(description)
    const creatorMail = res.locals.mail
    // res.status(200).json({success:true})
    if(!obj.language || !obj.grade || !obj.subject || !obj.chapter || !obj.heading || !obj.content) return res.status(400).json({success:false, message:'Some key value pairs are missed'})

    
    try {
        const lessonCreator = await User.findOne({email:creatorMail})
        if(!req.file) {
            const newLesson = await Lesson.create({
                'language': obj.language,
                'grade': obj.grade,
                'subject': obj.subject,
                'Chapter': obj.chapter,
                'heading': obj.heading,
                'content': obj.content,
                'creatorFirstName': lessonCreator.firstname,
                'creatorLastName': lessonCreator.lastname,
                'creatorEmail': lessonCreator.email,
                'creatorID': lessonCreator.id
            })
            return res.status(201).json({success:true, message:'Lesson has been created without lesson banner', lesson:newLesson })
        }else{
            const { filename } = req.file
            const localStoreDestination = path.join(__dirname, '../', '../', `/storage/images/${filename}`)
            const newLesson = await Lesson.create({
                'language': obj.language,
                'grade': obj.grade,
                'subject': obj.subject,
                'Chapter': obj.chapter,
                'heading': obj.heading,
                'content': obj.content,
                'filePath': localStoreDestination,
                'creatorFirstName': lessonCreator.firstname,
                'creatorLastName': lessonCreator.lastname,
                'creatorEmail': lessonCreator.email,
                'creatorID': lessonCreator.id
            })
            return res.status(201).json({success:true, message:'Lesson has been created', lesson:newLesson })
        }   
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = lessonCreateHandler