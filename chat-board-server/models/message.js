const mongoose = require("mongoose");
const db = require("./index");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true
});

messageSchema.pre("remove", async function(next){
  try {
    const user = await db.User.findById(this.user);
    user.messages.remove(this.id);
    await user.save();
    return next();
  } catch(err) {
    return next(err);
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;