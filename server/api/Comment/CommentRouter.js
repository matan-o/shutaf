const CommentRouter = require('express').Router()
const { checkToken } = require('../../authorization/token_validation');

const {
    getAllComments,
    addComment,
    deleteComment,
    updateComment} = require('./CommentController') 

CommentRouter.get('/',getAllComments )
CommentRouter.post('/comment', checkToken, addComment )
CommentRouter.delete('/delete/:id',deleteComment )
CommentRouter.put('/update/:id',updateComment )

module.exports = CommentRouter;