const Category = require("../../models/Category")
const Post = require("../../models/Post")

const getCategories = (req, res) => {
    Category.find().then(categories =>{
        res.send(categories)
    })
};

const createCategory = (req, res) =>{
    const category = new Category({
        name: req.body.name
    })
    category.save().then((newCategory)=>{
        res.send(newCategory)
    })
};

const deleteCategory = (req, res) =>{
    Category.deleteOne({_id: req.params.id})
    .then(result => console.log(result))
    res.send(true);
};

const toggleActiveCategory = (req, res) =>{
    Category.updateOne({ _id: req.params.id}, {isActive: req.body.isActive})
    Post.updateMany({ category: req.params.id }, {isActive: req.body.isActive})
    .then(result => res.send(true))
}

module.exports = {
    getCategories,
    createCategory,
    deleteCategory,
    toggleActiveCategory
}