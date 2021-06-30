const Comment = require("../../models/Comment");
const Post = require("../../models/Post");

const getAllComments = (req, res) => {
  Comment.find().then((comments) => {
    res.send(comments);
  });
};

const addComment = (req, res) => {
  const { body } = req;
  const comment = new Comment({
    post_id: body.post_id,
    user: req.decoded.id,
    body: body.body,
    date: body.date,
  });
  comment.save().then((c) => {
    Post.updateOne({ _id: body.post_id }, { $push: { comments: c._id } }).then(
      (result) => {
        const userPopulation =
          "-__v -password -sex -birthDay -address -posts -posts_marked -registration_date -isAdmin";

        c.populate(
          {
            path: "user",
            options: {
              select: userPopulation,
            },
          },
          (err, commentResult) => {
            res.send(commentResult);
          }
        );
      }
    );
  });
};

const deleteComment = (req, res) => {
  Comment.deleteOne({ _id: req.params.id }).then((result) =>
    console.log(result)
  );
  res.send(true);
};

const updateComment = (req, res) => {
  const { body, params } = req;
  Comment.updateOne(
    { _id: params.id },
    {
      body: body.body,
    }
  ).then((updated) => {
    console.log(updated);
  });
};

module.exports = {
  getAllComments,
  addComment,
  deleteComment,
  updateComment,
};
