const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongo://localhost:28888/chat-board", {
  keepAlive: true,
  useMongoClient: true
});

module.exports.User = require("./user");