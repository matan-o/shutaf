const categoriesRouter =  require('express').Router();

const { getCategories, 
        createCategory,
        deleteCategory,
        toggleActiveCategory} = require('./categoryController')

categoriesRouter.get('/', getCategories);
categoriesRouter.post('/create', createCategory);
categoriesRouter.delete('/delete/:id', deleteCategory);
categoriesRouter.put('/active/:id', toggleActiveCategory);

module.exports = categoriesRouter;
