const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {

  let token = req.get("authorization");

  if (token) {
    token = token.toString();
    jwt.verify(token, "qwe1234", (err, decoded) => {
      if (err) {
        return res.json({
          succsess: 0,
          message: "invalid token",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return req.json({
      succsess: 0,
      message: "access denied! unauthorizes user!",
    });
  }
};

const receiveToken = (req, res, next) => {
  let token = req.get("authorization");

  if (token) {
    token = token.toString();
    jwt.verify(token, "qwe1234", (err, decoded) => {
      if (!err) {
        req.decoded = decoded;
      }

      next();
    });
  } else {
    next();
  }
};

module.exports = {
  checkToken,
  receiveToken
};
