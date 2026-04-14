const Comment = require("../models/comment")
const Post = require("../models/post")

const writeComment = async (req, res) => {
    try {
        const user = req.user?.id || req.body.user
        const { post, body } = req.body

        if (!post || !user || !body) {
            return res.status(400).json({
                success: false,
                message: "Fields Must Be Complete"
            })
        }

        const existingPost = await Post.findById(post)
        if (!existingPost) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            })
        }

        const comment = new Comment({
            post,
            user,
            body
        })

        const savedComment = await comment.save()

        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true }
        )
        .populate({
            path: 'comments',
            populate: { path: 'user' }
        })
        .exec()

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Comment Added Successfully",
            post: updatedPost
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

module.exports = {
    writeComment
}