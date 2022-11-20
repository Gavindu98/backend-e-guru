const Forum = require('../../models/forumModel')
const User = require('../../models/userModel')

const forumAllViewHandler = async (req, res) => {
    const userEmail = res.locals.mail
    if (!userEmail) return res.status(400).json({ success: false, message: 'user not found' })

    try {
        const forums = await Forum.find()
        const user = await User.find({ email: userEmail })
        console.log(user);
        res.status(200).json({
            success: true,
            message: 'All posts are received',
            forums: forums,
            firstName: user.firstname,
            lastName: user.lastname
        })
    } catch (error) {
        res.status(400).json({ success: false, message: 'All quection loading err' })
    }

}

module.exports = forumAllViewHandler