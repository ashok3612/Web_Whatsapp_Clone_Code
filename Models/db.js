const mongoose = require("mongoose");

const mondoCluster =
  "mongodb+srv://ashok_admin:RAgQU5iWTkoiKpOP@cluster0.sqxrh.mongodb.net/webWhats?retryWrites=true&w=majority";

  // const mondoCluster =
  // "mongodb+srv://ashok_admin:RAgQU5iWTkoiKpOP@cluster0.sqxrh.mongodb.net/webWhatsLocal?retryWrites=true&w=majority";

mongoose.connect(
  mondoCluster,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) console.log("Fail to connect to DB : ", error);
    else console.log("DB connected succefully");
  }
);

require("./chat.Model");
require("./user.Model");
require("./support.Model")