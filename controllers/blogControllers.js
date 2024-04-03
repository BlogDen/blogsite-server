const Blog = require('../models/blogModel')
const fs = require("fs")


const getAllBlogs = async (req, res) => {
    try {
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
        const { title, body, description } = req.body;
        const user_id = req.user._id;
        const user_email = req.user.email;
        const img = {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/png"
        }
        const blog = await Blog.create({ title: title, description: description, body: body, img: img, user_id: user_id, user_email: user_email })

        // console.log(blog)
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


const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        // const blog = await Blog.findByIdAndDelete(id);

        const blog = await Blog.findOneAndDelete({ _id: id });

        // res.status(200).json(workout);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { getBlog, getUserBlogs, createBlog, getAllBlogs, deleteBlog }

