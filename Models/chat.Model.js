const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
  Created_At: {
    type: String,
    required: true,
  },
});

mongoose.model("Chat", chatSchema);
