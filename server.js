const express = require('express');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose')
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())

const URI = 'mongodb+srv://greenteabag:7OUql4sK54bgsszq@green.khp1qxy.mongodb.net/blogs?retryWrites=true&w=majority'
//possible new password - 7OUql4sK54bgsszq

mongoose.connect(URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Server running on port ', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err)
    })


app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

