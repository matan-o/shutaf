const User = require("../../models/User");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const createJsonToken = (user) => {
  const jsonToken = sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "qwe1234"
  );
  return jsonToken;
};

const getUserById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate({
      path: "posts",
      options: {
        sort: { date: -1 },
        select: "-__v -posts",
      },
      populate: {
        path: "comments",
        options: {
          sort: { date: -1 },
          select: "-__v",
        },
      },
    })
    .select("-password -__v")
    .then((result) => {
      res.send(result);
    });
};

const getUsers = (req, res) => {
  const currentId = req.query.id;
  User.find({ _id: { $ne: currentId } }).then((users) => {
    res.send(users);
  });
};

const createUser = (req, res) => {
  const body = req.body;
  body.password = hashSync(body.password, genSaltSync(10));

  const user = new User({
    isActive: true,
    email: req.body.email,
    password: body.password,
    first_name: "",
    last_name: "",
    sex: "",
    birthDay: undefined,
    address: {
      city: "",
      street: "",
      houseNumber: "",
    },
    imgUrl: "",
    posts: [],
    posts_marked: [],
    registration_date: new Date(),
    isAdmin: false,
  });
  user.save().then((user) => {
    user.password = undefined;
    const jsonToken = createJsonToken(user);

    res.send({ jwt: jsonToken, isAdmin: user.isAdmin, id: user._id });
  });
};

const login = (req, res) => {
  const { body } = req;
  User.find({ email: body.email })
    .exec()
    .then((userRes) => {
      let user = userRes[0];
      if (user) {
        const isPasswordCurrect = compareSync(body.password, user.password);
        if (isPasswordCurrect) {
          user.password = undefined;
          const jsonToken = createJsonToken(user);

          res.send({ jwt: jsonToken, isAdmin: user.isAdmin, id: user.id });
        } else {
          res.send("password not match");
        }
      } else {
        res.send("");
      }
    })
    .catch((err) => res.send(err));
};

const getMyProfile = (req, res) => {

  if (req.decoded) {
    User.find({ _id: req.decoded.id })
      .populate({
        path: "posts",
        options: {
          sort: { date: -1 },
          select: "-__v",
        },
      })
      .select("-password -__v")
      .then((result) => {
        result = result[0];
        res.send(result);
      });
  } else {
    res.send("can't get to profile, not authorized");
  }
};

const updateMyDetails = (req, res) => {
  if (req.decoded) {
    const { body } = req;
    const filter = { _id: req.decoded.id };
    const updated = {
      first_name: body.first_name,
      last_name: body.last_name,
      sex: body.sex,
      birthDay: body.birthDay,
      address: {
        city: body.address.city,
        street: body.address.street,
        houseNumber: body.address.houseNumber,
      },
      imgUrl: body.imgUrl,
    };
    User.findOneAndUpdate(filter, updated, { new: true })
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => res.send(err));
  } else {
    res.send("can't update details, not authorized");
  }
};

const toggleActiveUser = (req, res) => {
  User.updateOne(
    { _id: req.params.id },
    {
      isActive: req.body.isActive,
    }
  )
    .exec()
    .then((response) => res.send(true));
};

const toggleAdmin = (req, res) =>{
  const currentId = req.params.id
  const state = req.body.isAdmin
  User.updateOne({ _id: currentId }, { isAdmin: state })
  .then(result => res.send(true))
 
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  getMyProfile,
  updateMyDetails,
  toggleActiveUser,
  toggleAdmin
};
