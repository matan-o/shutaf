const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    id: String,
    post_id: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    body: String,
    date: Date,
})
    
module.exports = mongoose.model('Comment', Comment)