const mongoose = require("mongoose");
const Chats = mongoose.model("Chat");

let io;
const getIo = (myio) => {
  io = myio;
};

const getEndToEndChat = (req, res) => {
  let document = {};
  Chats.find({
    $or: [
      { From: req.body.from, To: req.body.to },
      { From: req.body.to, To: req.body.from },
    ],
  })
    .sort({ Created_At: 1 })
    .exec((err, doc) => {
      if (err) {
        document = {
          error: `Error occured while Accessing specific chats : ${err}`,
        };
      } else {
        document = doc;
      }
      return res.json(document);
    });
};

const getLastChat = (req, res) => {
  let document = {};
  Chats.find({
    $or: [
      { From: req.body.from, To: req.body.to },
      { From: req.body.to, To: req.body.from },
    ],
  })
    .sort({ Created_At: -1 })
    .limit(1)
    .exec((err, doc) => {
      if (err) {
        document = {
          error: `Error occured while Accessing last chats : ${err}`,
        };
      } else {
        document = doc[0];
      }
      return res.json(document);
    });
};

const saveChatToDB = (req, res) => {
  let chat = new Chats();
  chat.From = req.body.from;
  chat.To = req.body.to;
  chat.Message = req.body.message;
  chat.Created_At = req.body.created_at;
  let document = {};
  chat.save((err) => {
    if (err) {
      document = {
        error: `Error occured while Accessing specific chats : ${err}`,
      };
    } else {
      document = chat;
      io.emit("ResFromAPI", {
        from: req.body.from,
        to: req.body.to,
      });
    }
    return res.json(document);
  });
};

module.exports = {
  getIo,
  getEndToEndChat,
  saveChatToDB,
  getLastChat,
};
