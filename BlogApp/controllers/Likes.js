const Like = require('../models/likes')
const Post = require('../models/post')

const likePost = async (req, res) => {
    try {
        const user = req.user?.id || req.body.user
        const { post } = req.body

        if (!user || !post) {
            return res.status(400).json({
                success: false,
                message: "Fields Cannot Be Empty"
            })
        }

        const existingPost = await Post.findById(post)

        if (!existingPost) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            })
        }

        const existingLike = await Like.findOne({ post, user })

        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: "Post already liked"
            })
        }

        const like = new Like({ user, post })
        const savedLike = await like.save()

        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true }
        )
        .populate({
            path: "likes",
            populate: { path: "user" }
        })
        .exec()

        return res.status(201).json({
            success: true,
            message: "Added Like Successfully",
            post: updatedPost
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}


const removeLike=async(req,res)=>{
    try{
        const user = req.user?.id || req.body.user;
        const {post}=req.body

        if (!user || !post) {
            return res.status(400).json({
                success: false,
                message: "Fields Cannot Be Empty"
            })
        }

        const existingPost = await Post.findById(post)

        if (!existingPost) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            })
        }

        const deletedLike=await Like.findOneAndDelete({post,user})

        if (!deletedLike) {
        return res.status(400).json({
            success: false,
            message: "Like does not exist"
        });
        }

        const updatedPost=await Post.findByIdAndUpdate(post,
            {$pull:{
                likes:deletedLike._id
            }},
            {new:true}
        )
        .populate({
            path:"likes",
            populate:{path:"user"}
        })
        .exec()


        return res.status(200).json({
            success: true,
            message: "Removed Like Successfully",
            post: updatedPost
        })

    }catch(err){
       return res.status(500).json({
            success: false,
            message: "Server Error"
        }) 
    }
}

module.exports = { likePost,removeLike }