const Post = require('../models/post')
const User = require('../models/user')

const createPost = async (req, res) => {
    try {
        const user = req.user?.id || req.body.user
        const { title, body } = req.body

        if (!title || !body || !user) {
            return res.status(400).json({
                success: false,
                message: "Fields Must Be Filled"
            })
        }

        const existingUser = await User.findById(user)

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const newPost = await Post.create({
            title,
            body,
            user
        })

        return res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            post: newPost
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .select("title body user comments likes createdAt")
            .populate('user', 'name email')
            .populate({
                path: 'comments',
                select: 'body user createdAt',
                populate: {
                    path: 'user',
                    select: 'name email'
                }
            })
            .populate({
                path: 'likes',
                select: 'user',
                populate: {
                    path: 'user',
                    select: 'name email'
                }
            })
            .sort({ createdAt: -1 })
            .lean()
            .exec()

        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            posts
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}


module.exports = {
    createPost,
    getAllPosts
}

