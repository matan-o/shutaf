const mongoose = require('mongoose');

const Post = mongoose.Schema({
    id: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    body: String,
    date: Date,
    location: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    imgUrl: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    lastUpdate: Date,
    isActive: Boolean,
})
    
module.exports = mongoose.model('Post', Post)