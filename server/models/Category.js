const mongoose = require('mongoose');

const Category = mongoose.Schema({
    id: String,
    name: String,
})
    
module.exports = mongoose.model('Category', Category)