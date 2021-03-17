// Imports
const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");
const path = require("path");

require("./Models/db");
const userUtil = require("./Utils/user.Utils");
const chatUtil = require("./Utils/chat.Utils");
const supportUtil = require("./Utils/Support.Utils");

// Constants
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userUtil);
app.use("/api/v1/chat", chatUtil);
app.use("/api/v1/support", supportUtil);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

// Server
server = app.listen(PORT, (req, res) => {
  console.log("Server Started on port", PORT);
});

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", function (socket) {
  const { getIo } = require("./Controllers/chat.Controller");
  getIo(io);
  console.log("Made socket connection");
});
