const mongoose = require("mongoose");

const User = mongoose.Schema({
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  sex: String,
  birthDay: Date,
  address: {
    city: String,
    street: String,
    houseNumber: String,
  },
  imgUrl: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  posts_marked: Array,
  registration_date: Date,
  isAdmin: Boolean,
  isActive: Boolean,
});

module.exports = mongoose.model("User", User);
