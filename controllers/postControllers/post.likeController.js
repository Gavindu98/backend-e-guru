const Post = require('../../models/postModel')

const arrayCheck = (array, id) => {
        const checkResult = array.includes(id)
        return checkResult
}

const postLikeHandler = async (req, res) => {
    const {postID, userID, booleanState} = req.params
    // console.log(userID);
    try {
        const post = await Post.findOne({_id:postID})
        // console.log(post);
        if(!post) return res.status(404).json({success:false, message:`Post with id ${postID} is not found`})

        // const arrayLike = post.likeArray
        if (booleanState==="true") {
            if (post.likeArray.length == 0) {
                post.likeArray.push(userID)
                post.likeCount = post.likeArray.length
                await post.save()
                return res.status(200).json({success:true, message:'Post Very first LIKE '})
            }
        }else{
            if (post.likeArray.length == 0) {
                return res.status(409).json({success:true, message:'No At least one like'})
            }
        }
        
        // console.log(booleanState==="true" && arrayCheck(post.likeArray, userID));
        // like array creation
        if (booleanState==="true" && arrayCheck(post.likeArray, userID)) {
            return res.status(409).json({success:true, message:'Already liked'})
                
        }else if(booleanState==="true" && !arrayCheck(post.likeArray, userID)){
            post.likeArray.push(userID)
            post.likeCount = post.likeArray.length
            await post.save()
            return res.status(200).json({success:true, message:'LIKED'})    

        }else if(booleanState==="false" && arrayCheck(post.likeArray, userID)){
            const newLikeArray = post.likeArray.filter(val => val !== userID)
            post.likeArray = newLikeArray
            post.likeCount = post.likeArray.length
            await post.save()
            return res.status(200).json({success:true, message:'UNLIKED'})
        }else{
            return res.status(409).json({success:false, message:'Not liked yet'})
        }
        // // update field likeArray
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

module.exports = postLikeHandler