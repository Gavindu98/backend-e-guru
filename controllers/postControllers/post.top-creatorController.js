const Post = require('../../models/postModel')
const User = require('../../models/userModel')

const topCreatorHandler = async (req, res) => {
    try {
        // const allPosts = await Post.find()
        // // create creatorID array
        // let creatorIDArray = []
        // for (let i = 0; i < allPosts.length; i++) {
        //     let ID = allPosts[i].creator.creatorID
        //     // console.log(ID);
        //     creatorIDArray.push(ID)
        //     console.log(creatorIDArray.sort());  
        // }
        // let creatorIDArrayDup = creatorArray.map(id => (id))
        // let creatorArray = []
        // let countNum = 0
        // for (let a = 0; a < creatorIDArray.length; a++) {
        //     for (let b = 0; b < creatorIDArrayDup.length; b++) {
        //         if (creatorIDArray[a] == creatorIDArrayDup[b] ) {
        //             creatorIDArrayDup.splice(b,1)
        //             countNum++
        //         }  
        //     }
            
        // }
        const allUsers = await User.find()
        let userMails = []
        let userPosts = []
        let detailArray = []
        for (let i = 0; i < allUsers.length; i++) {
            userMails.push(allUsers[i].email)
        }

        for (let j = 0; j < userMails.length; j++) {
            userPosts = await Post.find({creatorEmail:userMails[j]})
            let countNum = userPosts.length
            detailArray.push({
                creatorData : userMails[j],
                numberOfPosts : countNum
            })
            
        }
        // sorting of detailArray (Check with sorting again)
        detailArray.sort((a, b) => {
            return b.numberOfPosts - a.numberOfPosts;
        });
        const topCreators = detailArray.splice(0,5)
        
        // populate user details
        let topCreatorsDetails = []
        for (let k = 0; k < topCreators.length; k++) {
            let topCreator = await User.findOne({email:topCreators[k].creatorData})
            topCreatorsDetails.push(topCreator)
        }
        res.status(200).json({success:true, data: topCreatorsDetails})
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}

module.exports = topCreatorHandler