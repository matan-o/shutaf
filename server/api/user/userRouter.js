const userRouter = require('express').Router();
const { checkToken } = require('../../authorization/token_validation');
const { getUsers, 
        getUserById,
        createUser, 
        login, 
        getMyProfile, 
        updateMyDetails,
        toggleActiveUser,
        toggleAdmin } = require('./userController')

userRouter.get('/', getUsers);
userRouter.get('/user/:id', getUserById);
userRouter.post('/user', createUser);
userRouter.post('/login', login);
userRouter.get('/myProfile', checkToken, getMyProfile);
userRouter.put('/myProfile', checkToken, updateMyDetails);
userRouter.put('/userActive/:id', toggleActiveUser);
userRouter.put('/isAdmin/:id', toggleAdmin);

module.exports = userRouter;
