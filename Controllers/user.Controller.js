const mongoose = require("mongoose");
const { initiateUserSupportForUser } = require("./support.Controller");
const Users = mongoose.model("User");

const getAllUsers = (req, res) => {
  let document = {};
  Users.find((err, doc) => {
    if (err) {
      document = {
        error: `Error occured while Accessing all Users : ${err}`,
      };
    } else {
      document = doc;
      if (document === null) {
        document = {
          error: "OOPS, No users found in our database...",
        };
      }
    }
    return res.json(document);
  });
};

const insertUser = (req, res) => {
  let document = {};
  let user = new Users();
  user.googleId = req.body.googleId;
  user.imageUrl = req.body.imageUrl;
  user.email = req.body.email;
  user.name = req.body.name;
  user.givenName = req.body.givenName;
  user.familyName = req.body.familyName;

  user.save((err) => {
    if (err) {
      document = {
        error: `Error occured while save Users : ${err}`,
      };
    } else {
      document = user;
      initiateUserSupportForUser(document.googleId);
    }
    return res.json(document);
  });
};

const getUserById = (req, res) => {
  let document = {};
  Users.find()
    .where("googleId")
    .equals(req.body._id)
    .exec((err, user) => {
      if (err) {
        document = {
          error: `Error occured while get single User : ${err}`,
        };
      } else {
        document = user[0];
        if (document === undefined) {
          document = {
            error:
              "OOPS, User who you are trying to reach was not found in our database...",
          };
        }
      }
      res.json(document);
    });
};

const getUserByIdIthObj = async (req) => {
  let document = {};
  return new Promise((resolve, reject) => {
    Users.find()
      .where("googleId")
      .equals(req._id)
      .exec((err, user) => {
        if (err) {
          document = {
            error: `Error occured while get single User : ${err}`,
          };
        } else {
          document = user[0];
          if (document === undefined) {
            document = {
              error:
                "OOPS, User who you are trying to reach was not found in our database...",
            };
          }
        }
        resolve(document);
      });
  });
};

const getSingleUser = (req, res) => {
  let document = {};
  Users.find()
    .where("email")
    .equals(req.body.email)
    .exec((err, user) => {
      if (err) {
        document = document = {
          error: `Error occured while get single User : ${err}`,
        };
      } else {
        document = user[0];
        if (document === undefined) {
          document = {
            error:
              "OOPS, User who you are trying to reach was not found in our database...",
          };
        }
      }
      res.json(document);
    });
};

module.exports = {
  getAllUsers,
  insertUser,
  getUserById,
  getSingleUser,
  getUserByIdIthObj,
};
