const Answer = require('../../models/answerModel')
const User = require('../../models/userModel')

const quectionAnswersHandler = async (req, res) => {
    const { quectionId, userId } = req.body
    if (!quectionId || !userId) return res.status(400).json({ success: false, message: 'Bad request body' })

    try {
        // const answers = await Forum.findById(quectionId)
        // if (!answers) return res.status(404).json({ succes: false, message: 'Quection not found' })
        const allAnswers = await Answer.find({ quectionId: quectionId })
        console.log("get Answers Arr=", allAnswers)
        // const finalCommentList = (list) => {
        const AnswerArray = allAnswers?.map((data) => {
            if (data.quectionId == quectionId) {
                return {
                    createdAt: data.createdAt,
                    answerId: data._id,
                    firstName: data.creator.firstname,
                    lastName: data.creator.lastname,
                    email: data.creator.email,
                    answer: data.answer,
                    userId: data.userId,
                    postID: data.postID,
                    quectionId: data.quectionId
                };
            }

        });
        return res.status(200).json({ AnswerArray })
        //};
        // console.log("finalCommentList=>", tempArr)
        //return res.status(200).json({ allAnswers })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = quectionAnswersHandler