const mongoose = require("mongoose");
// mongoose.set("debug", true);
mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:28888/chat-board", {
// mongoose.connect(process.env.MONGODB_URI, {

mongoose.connect("mongodb://localhost:28888/chat-board", {
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

module.exports.User = require("./user");
module.exports.Message = require("./message");