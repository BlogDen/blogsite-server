const express = require("express");
const { getAllBlogs, getUserBlogs, createBlog, getBlog, deleteBlog } = require('../controllers/blogControllers')
const multer = require("multer");
const { checkAuth } = require("../middleware/checkAuth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const router = express.Router();



//Get User blogs
// router.get('/', getUserBlogs)
router.get('/', getAllBlogs)

router.use(checkAuth)


//Get a particular users own blogs
router.get('/own-blogs', getUserBlogs)


//Post or Create new Blog
router.post('/', upload.single('testImage'), createBlog)



//Get a single Blog
router.get('/:id', getBlog);

router.delete('/:id', deleteBlog);

module.exports = router