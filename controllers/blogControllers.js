const Blog = require('../models/blogModel')
const fs = require("fs")


const getAllBlogs = async (req, res) => {
    try {
        // const user_id = req.user._id;
        const Blogs = await Blog.find().sort({ createdAt: -1 }).limit(5)
        res.status(200).json({
            Blogs: Blogs
        })
    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
}


//Get a Users own Blogs
const getUserBlogs = async (req, res) => {
    try {
        const user_id = req.user._id;
        const Blogs = await Blog.find({ user_id: user_id }).sort({ createdAt: -1 })
        res.status(200).json({
            Blogs: Blogs
        })
    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
}


const createBlog = async (req, res) => {
    try {
        const { title, body } = req.body;
        const user_id = req.user._id;
        const img = {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/png"
        }
        const blog = await Blog.create({ title: title, body: body, img: img, user_id: user_id })

        res.status(200).json({
            blog: blog
        })

    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
}


//Get a single Blog
const getBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);
        res.status(200).json({
            blog: blog
        })

    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
}

module.exports = { getBlog, getUserBlogs, createBlog, getAllBlogs }

