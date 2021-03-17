const mongoose = require("mongoose");

const supportScheme = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  Friends: {
    type: Array,
    required: true,
  },
});

mongoose.model("Support", supportScheme);
