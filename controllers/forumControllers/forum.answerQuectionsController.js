const Answer = require('../../models/answerModel')
const User = require('../../models/userModel')

const { google } = require('googleapis')
const path = require('path')

const answerQuectionHandler = async (req, res) => {
    console.log("forum data", req.body)
    const { userId, quectionId, answer } = req.body
    if (!userId || !quectionId || !answer) return res.status(400).json({ success: false, message: 'missing body value' })

    // extract creator details 
    const creatorMail = res.locals.mail
    console.log("creatorMail", creatorMail)// passing data from one to next middleware
    if (!creatorMail) return res.status(410)

    // extract file details
    // const { filename } = req.file
    // if(!filename) return res.status(410)
    // console.log(filename);
    // const localStoreDestination = path.join(process.env.VIKUM_DIR, `storage/images/${filename}`, )
    // const localStoreDestination = `${process.env.VIKUM_DIR}/storage/images/${filename}`
    // console.log(localStoreDestination);
    // return res.status(200).json({success: true})
    try {
        console.log("run")
        const user = await User.findOne({ email: creatorMail })
        console.log("user", user)
        // save post to db
        const newAnswer = await Answer.create({
            "userId": userId,
            "quectionId": quectionId,
            "answer": answer,
            "creator": {
                "email": creatorMail,
                "firstname": user.firstname,
                "lastname": user.lastname
            }
        })
        console.log("newAnswer", newAnswer)
        //const answer = await Answer.findById(newAnswer._id)

        //console.log("answer", answer)
        // console.log(newPost);
        res.status(201).json({
            success: true,
            message: 'answer has been added',
            //answer: answer
        })
    } catch (error) {
        console.log("error", error)
        res.status(401).json({ success: false, message: 'answer adding is failed' })
    }
}


module.exports = answerQuectionHandler