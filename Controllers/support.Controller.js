const mongoose = require("mongoose");
const Support = mongoose.model("Support");

const initiateUserSupportForUser = (userId) => {
  let support = new Support();
  support.googleId = userId;
  support.Friends = [];
  support.save((err) => {
    if (err) {
      console.log(`Error occured while save Users : ${err}`);
    }
  });
};

const getAllFriends = (req, res) => {
  let document = {};
  Support.find()
    .where("googleId")
    .equals(req.body._id)
    .exec((err, friends) => {
      if (err) {
        document = {
          error: `Error occured while get User friends : ${err}`,
        };
      } else if(friends === undefined || friends.length === 0){
        document = {
          error: `No Friends Found : ${err}`,
        };
      }else {
        document = friends[0].Friends;
        if (friends.length === 0) {
          document = {
            error: "OOPS, No friends found...",
          };
        }
      }
      res.json(document);
    });
};

const addFriendToList = (req, res) => {
  let doc = {};
  Support.find()
    .where("googleId")
    .equals(req.body._id)
    .exec((err, user) => {
      if (err) {
        res.status(500).send("Error Occured");
      } else {
        document = user[0];
        if (user.length === 0) {
          res.status(500).send("OOPS, No User found...");
        } 
        else {
          if(req.body.newFriend !== undefined){
          let flag = true;
          document.Friends.forEach((ele) => {
            if (ele.googleId === req.body.newFriend.googleId) {
              flag = false;
            }
          });
          if (flag) {
            document.Friends.push(req.body.newFriend);
            document.save();
            res.json(document.Friends);
          }
          else{
            res.status(500).send("Request body with empty friend");
          }
          } else {
            res.status(500).send("OOPS, User already had this friend...");
          }
        }
      }
    });
};

module.exports = {
  initiateUserSupportForUser,
  getAllFriends,
  addFriendToList,
};
