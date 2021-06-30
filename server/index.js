const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./api/user/userRouter');
const categoriesRouter = require('./api/category/categoriesRouter');
const postRouter = require('./api/post/postRouter');
const CommentRouter = require('./api/Comment/CommentRouter')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/users',userRouter)
app.use('/categories',categoriesRouter)
app.use('/posts', postRouter)
app.use('/comments', CommentRouter)

const userAndPassword = 'root:mm40030403'
const dbName = 'shutaf'
mongoose.connect(`mongodb+srv://${userAndPassword}@cluster0.y60jy.mongodb.net/${dbName}?retryWrites=true&w=majority`);

app.listen(3001, ()=>{
    console.log("yeah!")
});