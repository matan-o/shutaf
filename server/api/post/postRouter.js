const postRouter = require('express').Router()
const { checkToken, receiveToken } = require('../../authorization/token_validation');

const {getPosts,
       getPostById, 
       getPostsByUserId,
       createPost,  
       deletePost,
       updatePost} = require('./postController')


postRouter.get('/', receiveToken, getPosts);
postRouter.get('/user/:id', getPostsByUserId);
postRouter.get('/post/:id', receiveToken, getPostById);
postRouter.post('/create', checkToken, createPost)
postRouter.delete('/delete/:id', deletePost)
postRouter.put('/post/:id', updatePost)

module.exports = postRouter