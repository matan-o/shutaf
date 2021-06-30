const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

const POST_FEED_LIMIT = 3;

const userPopulation =
  "-__v -password -sex -birthDay -address -posts -posts_marked -registration_date -isAdmin";

const getPostsByUserId = (req, res) => {
  const page = req.query.page;

  Post.find({ user: req.params.id })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        Math: { isActive: true },
        options: {
          select: userPopulation,
        },
      },
      options: {
        sort: { date: -1 },
        select: "-__v",
      },
    })
    .populate({
      path: "user",
      options: {
        select: userPopulation,
      },
    })
    .skip((page - 1) * POST_FEED_LIMIT)
    .limit(POST_FEED_LIMIT)
    .then((posts) => {
      res.send(posts);
    });
};

const getPostById = (req, res) => {
  const currentUserId = req.decoded ? req.decoded.id : null;
  Post.find({ _id: req.params.id })
    .populate({
      path: "comments",
      options: {
        sort: { date: -1 },
        select: "-__v",
        populate: {
          path: "user",
          options: {
            select: userPopulation,
          },
        },
      },
    })
    .populate({
      path: "user",
      options: {
        select: userPopulation,
      },
    })
    .populate({
      path: "category",
      options: {
        select: "-__v",
      },
    })
    .then((results) => {
      const p = results[0];
      const postComments = p.comments
        .filter((com) => com._doc.user.isActive)
        .map((c) => {
          return { ...c._doc, currentUser: c._doc.user._id == currentUserId };
        });

      const post = {
        _id: p._id,
        title: p.title,
        body: p.body,
        date: p.date,
        location: p.location,
        category: p.category,
        imgUrl: p.imgUrl,
        comments: postComments,
        user: p.user,
        currentUser: p.user._id == currentUserId,
      };

      res.send(post);
    });
};

const getPosts = (req, res) => {
  const currentUserId = req.decoded ? req.decoded.id : null;
  const page = req.query.page;

  Post.find({ isActive: true })
    .populate({
      path: "comments",
      options: {
        limit: 3,
        sort: { date: -1 },
        select: "-__v",
        populate: {
          path: "user",
          options: {
            select: userPopulation,
          },
        },
      },
    })
    .populate({
      path: "user",
      options: {
        select: userPopulation,
      },
    })
    .populate({
      path: "category",
      options: {
        select: "-__v",
      },
    })
    .sort({ date: -1 })
    .skip((page - 1) * POST_FEED_LIMIT)
    .limit(POST_FEED_LIMIT)
    .then((results) => results.filter((post) => post.user.isActive))

    .then((posts) => {
      const results = posts.map((p) => {
        const postComments = p.comments
          .filter((com) => com._doc.user.isActive)
          .map((c) => {
            return { ...c._doc, currentUser: c._doc.user._id == currentUserId };
          });

        const post = {
          _id: p._id,
          title: p.title,
          body: p.body,
          date: p.date,
          location: p.location,
          category: p.category,
          imgUrl: p.imgUrl,
          comments: postComments,
          user: p.user,
          currentUser: p.user._id == currentUserId,
        };
        return post;
      });
      res.send(results);
    });
};

const createPost = (req, res) => {
  const body = req.body;
  const post = new Post({
    user: req.decoded.id,
    title: body.title,
    body: body.body,
    date: body.date,
    location: body.location,
    category: body.category,
    imgUrl: body.imgUrl,
    comments: [],
    isActive: true,
  });
  post.save().then((newPost) => {
    User.updateOne({ _id: req.decoded.id }, { $push: { posts: newPost._id } });
    Post.findById(newPost._id)
      .populate({
        path: "user",
        options: {
          select: userPopulation,
        },
      })
      .populate({
        path: "category",
        options: {
          select: "-__v",
        },
      })
      .then((p) => res.send(p));
  });
};

const deletePost = (req, res) => {
  Comment.deleteMany({ post_id: req.params.id }).exec();
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
  });
  res.send(true);
};

const updatePost = (req, res) => {
  const { body } = req;
  Post.updateOne(
    { _id: req.params.id },
    {
      title: body.title,
      body: body.body,
      imgUrl: body.imgUrl,
      location: body.location,
      lastUpdate: new Date(),
    }
  ).then((updated) => {
    console.log(updated);
    res.send(true);
  });
};

module.exports = {
  getPostsByUserId,
  getPostById,
  getPosts,
  createPost,
  deletePost,
  updatePost,
};
